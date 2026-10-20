import { ConditionAnswers, PhoneModel, ValuationResult, ValuationBreakdownItem } from '@/types';

// Storage multipliers relative to lowest tier
export const STORAGE_MULTIPLIERS: Record<string, number> = {
  '32 GB': 0.9,
  '64 GB': 1.0,
  '128 GB': 1.12,
  '256 GB': 1.25,
  '512 GB': 1.4,
  '1 TB': 1.55,
};

export function calculateValuation(
  model: PhoneModel,
  storage: string,
  condition: ConditionAnswers
): ValuationResult {
  const breakdown: ValuationBreakdownItem[] = [];

  // 1. Base price with storage adjustment
  const storageMultiplier = STORAGE_MULTIPLIERS[storage] || 1.0;
  const adjustedBasePrice = Math.round(model.baseValuation * storageMultiplier);

  breakdown.push({
    label: `Base Working Value (${model.name} ${storage})`,
    impact: 'Starting market baseline for fully functional unit',
    amount: adjustedBasePrice,
    type: 'base',
  });

  // 2. Critical Blockers Check -> Manual Inspection Required
  // If the phone is locked to an iCloud/Google account and won't turn on or has board damage,
  // it cannot be easily repurposed without specialized bench testing.
  if (condition.lockedOrAccountTied && (!condition.powersOn || condition.motherboardSuspectedDamaged)) {
    return {
      minPrice: Math.round(model.scrapFloorValuation * 0.5),
      maxPrice: Math.round(model.scrapFloorValuation * 1.0),
      basePrice: adjustedBasePrice,
      storageMultiplier,
      manualInspectionRequired: true,
      manualReason:
        'Device is account-locked with critical hardware/power faults. Our technicians need a hands-on bench test to confirm if chassis or secondary modules can be reclaimed.',
      breakdown: [
        ...breakdown,
        {
          label: 'Locked + Power/Board Fault',
          impact: 'Requires bench diagnosis before binding offer',
          amount: 0,
          type: 'deduction',
        },
      ],
      isDeadPhone: !condition.powersOn,
      partsRecoveryPotential: 'scrap_only',
    };
  }

  // 3. Multi-factor Deduction System with Cascading Decay
  // Instead of linear subtraction (which could reach negative amounts),
  // we apply multiplicative condition retention factors.
  let conditionRetention = 1.0;

  // Power on
  if (!condition.powersOn) {
    conditionRetention *= 0.45; // 55% loss if dead/won't turn on
    breakdown.push({
      label: 'Phone Does Not Power On (Dead / Boot loop)',
      impact: '-55% of functional value',
      amount: -Math.round(adjustedBasePrice * 0.55),
      type: 'deduction',
    });
  }

  // Display functionality
  if (!condition.displayWorking) {
    conditionRetention *= 0.65; // Screen blackout / bleeding / touch dead
    breakdown.push({
      label: 'Display Not Working / Blacked Out',
      impact: '-35% for display panel replacement need',
      amount: -Math.round(adjustedBasePrice * 0.35 * conditionRetention),
      type: 'deduction',
    });
  } else if (condition.screenCracked) {
    conditionRetention *= 0.78; // Glass crack only
    breakdown.push({
      label: 'Screen Glass Cracked / Scratched Deeply',
      impact: '-22% for front glass refurbishment',
      amount: -Math.round(adjustedBasePrice * 0.22 * conditionRetention),
      type: 'deduction',
    });
  }

  // Motherboard
  if (condition.motherboardSuspectedDamaged) {
    conditionRetention *= 0.50;
    breakdown.push({
      label: 'Suspected Motherboard / IC Issue',
      impact: '-50% component level risk factor',
      amount: -Math.round(adjustedBasePrice * 0.5 * conditionRetention),
      type: 'deduction',
    });
  }

  // Water Damage
  if (condition.waterDamaged) {
    conditionRetention *= 0.65;
    breakdown.push({
      label: 'Liquid / Moisture Corrosion History',
      impact: '-35% corrosion risk across traces',
      amount: -Math.round(adjustedBasePrice * 0.35 * conditionRetention),
      type: 'deduction',
    });
  }

  // Battery / Charging
  if (!condition.chargesNormally || !condition.batteryFunctional) {
    conditionRetention *= 0.85;
    breakdown.push({
      label: 'Battery Degradation / Faulty Charging Port',
      impact: '-15% battery/sub-board replacement',
      amount: -Math.round(adjustedBasePrice * 0.15 * conditionRetention),
      type: 'deduction',
    });
  }

  // Physical body intactness
  if (!condition.physicallyIntact || condition.bodyCondition === 'bent_cracked_back') {
    conditionRetention *= 0.75;
    breakdown.push({
      label: 'Chassis Bent or Back Housing Shattered',
      impact: '-25% housing replacement required',
      amount: -Math.round(adjustedBasePrice * 0.25 * conditionRetention),
      type: 'deduction',
    });
  } else if (condition.bodyCondition === 'heavy_scratches') {
    conditionRetention *= 0.90;
    breakdown.push({
      label: 'Heavy Wear & Body Scratches',
      impact: '-10% cosmetic depreciation',
      amount: -Math.round(adjustedBasePrice * 0.10 * conditionRetention),
      type: 'deduction',
    });
  }

  // Account lock penalty if powers on
  if (condition.lockedOrAccountTied) {
    conditionRetention *= 0.40;
    breakdown.push({
      label: 'Account Locked / Unable to Reset',
      impact: '-60% parts salvage only limitation',
      amount: -Math.round(adjustedBasePrice * 0.6 * conditionRetention),
      type: 'deduction',
    });
  }

  // 4. Calculate raw estimated value
  const rawCalculated = adjustedBasePrice * conditionRetention;

  // 5. Apply the Scrap & Parts Recovery Floor!
  // Every smartphone, even with destroyed screen and dead board, contains salvageable
  // camera sensors, microphones, vibration motors, speaker boxes, SIM trays, buttons, and pure metals.
  const floor = model.scrapFloorValuation;
  const finalCalculated = Math.max(rawCalculated, floor);

  // 6. Generate an indicative price range (typically +/- 12-18% range to account for variance)
  const spreadPercent = 0.15;
  let minPrice = Math.round((finalCalculated * (1 - spreadPercent)) / 50) * 50;
  let maxPrice = Math.round((finalCalculated * (1 + spreadPercent)) / 50) * 50;

  // Ensure minimum never drops below 60% of floor
  if (minPrice < Math.round(floor * 0.8)) {
    minPrice = Math.round(floor * 0.8);
  }
  if (maxPrice <= minPrice) {
    maxPrice = minPrice + 300;
  }

  const isDeadPhone = !condition.powersOn;
  let partsRecoveryPotential: 'high' | 'medium' | 'scrap_only' = 'high';
  if (condition.motherboardSuspectedDamaged || condition.waterDamaged) {
    partsRecoveryPotential = 'medium';
  }
  if (!condition.powersOn && !condition.displayWorking && condition.waterDamaged) {
    partsRecoveryPotential = 'scrap_only';
  }

  return {
    minPrice,
    maxPrice,
    basePrice: adjustedBasePrice,
    storageMultiplier,
    manualInspectionRequired: false,
    breakdown,
    isDeadPhone,
    partsRecoveryPotential,
  };
}
