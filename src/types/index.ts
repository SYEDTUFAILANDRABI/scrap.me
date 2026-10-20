export interface PhoneBrand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  active: boolean;
  order: number;
}

export interface PhoneModel {
  id: string;
  brandId: string;
  name: string;
  supportedStorage: string[];
  baseValuation: number; // Base reference price for pristine working unit
  scrapFloorValuation: number; // Minimum parts/scrap recovery value even if completely dead
  active: boolean;
}

export interface ConditionAnswers {
  powersOn: boolean;
  displayWorking: boolean;
  screenCracked: boolean;
  chargesNormally: boolean;
  batteryFunctional: boolean;
  waterDamaged: boolean;
  motherboardSuspectedDamaged: boolean;
  lockedOrAccountTied: boolean;
  physicallyIntact: boolean;
  bodyCondition: 'good' | 'minor_scratches' | 'heavy_scratches' | 'bent_cracked_back';
}

export interface ValuationBreakdownItem {
  label: string;
  impact: string;
  amount: number;
  type: 'base' | 'deduction' | 'bonus' | 'storage';
}

export interface ValuationResult {
  minPrice: number;
  maxPrice: number;
  basePrice: number;
  storageMultiplier: number;
  manualInspectionRequired: boolean;
  manualReason?: string;
  breakdown: ValuationBreakdownItem[];
  isDeadPhone: boolean;
  partsRecoveryPotential: 'high' | 'medium' | 'scrap_only';
}

export type RequestStatus =
  | 'new'
  | 'contacted'
  | 'inspection_scheduled'
  | 'inspected'
  | 'final_offer_made'
  | 'offer_accepted'
  | 'pickup_pending'
  | 'purchased'
  | 'cancelled';

export interface StatusAuditEntry {
  status: RequestStatus;
  note: string;
  timestamp: string;
  adminName?: string;
}

export interface SellingRequest {
  id: string;
  referenceId: string; // e.g. RS-2026-48912
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  pickupMethod: 'pickup' | 'dropoff';
  pickupAddress?: string;
  preferredContactTime: 'morning' | 'afternoon' | 'evening' | 'anytime';
  
  // Device
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  storage: string;
  condition: ConditionAnswers;
  
  // Valuation
  estimatedMinPrice: number;
  estimatedMaxPrice: number;
  adminOfferPrice?: number;
  adminOfferReason?: string;
  
  // Workflow
  status: RequestStatus;
  customerNotes?: string;
  photos: string[]; // Base64 or URL
  createdAt: string;
  updatedAt: string;
  auditLog: StatusAuditEntry[];
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  officeAddress: string;
  primaryRegion: string;
  serviceAreas: string[];
  demoMode: boolean;
  valuationNotice: string;
  dataSecurityNotice: string;
}

export interface ValuationRule {
  id: string;
  name: string;
  conditionKey: keyof ConditionAnswers;
  expectedFaultValue: boolean | string;
  deductionPercent: number;
  description: string;
  active: boolean;
}
