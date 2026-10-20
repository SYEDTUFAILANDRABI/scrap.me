'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Smartphone,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Search,
  Upload,
  X,
  MapPin,
  Calendar,
  MessageCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Zap,
  Flame,
  Droplets,
  Coins,
  Send,
  ExternalLink,
  PhoneCall,
} from 'lucide-react';
import { INITIAL_BRANDS, INITIAL_MODELS } from '@/lib/storage';
import { calculateValuation } from '@/lib/valuation-engine';
import { ConditionAnswers, PhoneBrand, PhoneModel, ValuationResult, SellingRequest } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { BRAND_CONFIG } from '@/config/brand';

const DEFAULT_CONDITION: ConditionAnswers = {
  powersOn: false,
  displayWorking: false,
  screenCracked: true,
  chargesNormally: false,
  batteryFunctional: false,
  waterDamaged: false,
  motherboardSuspectedDamaged: false,
  lockedOrAccountTied: false,
  physicallyIntact: true,
  bodyCondition: 'minor_scratches',
};

export function SellWizard() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Steps: 1: Brand & Model, 2: Storage & Condition, 3: Photos & Review, 4: Contact & Submission, 5: Confirmation
  const [step, setStep] = useState<number>(1);

  // Device selection state
  const [selectedBrand, setSelectedBrand] = useState<PhoneBrand>(INITIAL_BRANDS[0]);
  const [selectedModel, setSelectedModel] = useState<PhoneModel>(INITIAL_MODELS[0]);
  const [selectedStorage, setSelectedStorage] = useState<string>('128 GB');
  const [condition, setCondition] = useState<ConditionAnswers>(DEFAULT_CONDITION);
  const [modelSearch, setModelSearch] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  // Customer Contact State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [city, setCity] = useState<string>(BRAND_CONFIG.defaultCity);
  const [pickupMethod, setPickupMethod] = useState<'pickup' | 'dropoff'>('pickup');
  const [pickupAddress, setPickupAddress] = useState('');
  const [preferredContactTime, setPreferredContactTime] = useState<'morning' | 'afternoon' | 'evening' | 'anytime'>('afternoon');
  const [customerNotes, setCustomerNotes] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<SellingRequest | null>(null);

  // Check if state was passed from the Homepage widget via sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('reboot_scrap_quote');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.brand) setSelectedBrand(parsed.brand);
          if (parsed.model) setSelectedModel(parsed.model);
          if (parsed.storage) setSelectedStorage(parsed.storage);
          if (parsed.condition) setCondition(parsed.condition);
          if (searchParams.get('step') === 'submission') {
            setStep(4);
          }
        } catch {
          // ignore error
        }
      }
    }
  }, [searchParams]);

  // Models filtered by selected brand
  const filteredModels = useMemo(() => {
    return INITIAL_MODELS.filter(
      (m) =>
        m.brandId === selectedBrand.id &&
        m.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [selectedBrand, modelSearch]);

  // Calculate live valuation
  const valuation: ValuationResult = useMemo(() => {
    return calculateValuation(selectedModel, selectedStorage, condition);
  }, [selectedModel, selectedStorage, condition]);

  const updateCondition = (field: keyof ConditionAnswers, val: boolean | string) => {
    setCondition((prev) => ({ ...prev, [field]: val }));
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string].slice(0, 4));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!customerName.trim() || customerName.trim().length < 2) {
      setSubmitError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setSubmitError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (pickupMethod === 'pickup' && !pickupAddress.trim()) {
      setSubmitError('Please provide your complete pickup address in Kashmir');
      return;
    }
    if (!consentChecked) {
      setSubmitError('Please check the acknowledgment box before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        city,
        pickupMethod,
        pickupAddress: pickupMethod === 'pickup' ? pickupAddress.trim() : undefined,
        preferredContactTime,
        brandId: selectedBrand.id,
        brandName: selectedBrand.name,
        modelId: selectedModel.id,
        modelName: selectedModel.name,
        storage: selectedStorage,
        condition,
        estimatedMinPrice: valuation.minPrice,
        estimatedMaxPrice: valuation.maxPrice,
        customerNotes: customerNotes.trim() || undefined,
        photos,
      };

      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmittedRequest(data.data);
      setStep(5);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#22c55e', '#ffffff'],
        });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while submitting. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Transparent Phone Valuation & Buyback</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sell Your Dead or Damaged Phone
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Complete the quick questionnaire below to receive your indicative scrap offer and arrange doorstep collection in Kashmir.
        </p>
      </div>

      {/* Main Glass Form Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        {/* Step Indicator */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                Step {step} of 4:
                <span className="text-white">
                  {step === 1 && 'Select Phone Model'}
                  {step === 2 && 'Storage & Condition Check'}
                  {step === 3 && 'Valuation Breakdown & Photos'}
                  {step === 4 && 'Contact & Collection Details'}
                </span>
              </span>
              <span>{Math.round((step / 4) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT BRAND & MODEL */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">
                  Step 1: Choose Brand & Model
                </h2>
                <p className="text-xs text-slate-400">
                  Select your smartphone manufacturer, then find your exact model variant.
                </p>
              </div>

              {/* Brand Pills */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Brand
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  {INITIAL_BRANDS.map((brand) => {
                    const isSelected = selectedBrand.id === brand.id;
                    return (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => {
                          setSelectedBrand(brand);
                          const firstM = INITIAL_MODELS.find((m) => m.brandId === brand.id);
                          if (firstM) setSelectedModel(firstM);
                        }}
                        className={`p-3 rounded-xl flex items-center justify-center gap-2 border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md shadow-emerald-500/10'
                            : 'glass-card border-white/10 text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <Smartphone className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span>{brand.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Model Search & Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Select Model ({selectedBrand.name})
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search model..."
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      className="glass-input pl-8 pr-3 py-1.5 rounded-lg text-xs w-44"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {filteredModels.map((m) => {
                    const isSelected = selectedModel.id === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(m);
                          if (!m.supportedStorage.includes(selectedStorage)) {
                            setSelectedStorage(m.supportedStorage[0] || '128 GB');
                          }
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                            : 'glass-card border-white/10 text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="text-sm font-bold">{m.name}</div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Scrap floor: {formatCurrency(m.scrapFloorValuation)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  <span>Continue to Condition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: STORAGE & CONDITION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">
                  Step 2: Storage & Condition Questions
                </h2>
                <p className="text-xs text-slate-400">
                  Phone: <strong className="text-emerald-400">{selectedBrand.name} {selectedModel.name}</strong>
                </p>
              </div>

              {/* Storage selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Storage Capacity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(selectedModel.supportedStorage || ['64 GB', '128 GB', '256 GB']).map((cap) => {
                    const isSelected = selectedStorage === cap;
                    return (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => setSelectedStorage(cap)}
                        className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                            : 'glass-card border-white/10 text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <HardDrive className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span>{cap}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Condition Checklist */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Device Hardware Diagnostics
                </label>

                {/* Power */}
                <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className={`w-4 h-4 ${condition.powersOn ? 'text-emerald-400' : 'text-rose-400'}`} />
                    <span className="text-xs sm:text-sm font-semibold text-white">Does it power on / show display?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCondition('powersOn', true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        condition.powersOn ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCondition('powersOn', false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !condition.powersOn ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      No (Dead)
                    </button>
                  </div>
                </div>

                {/* Display Working */}
                <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className={`w-4 h-4 ${condition.displayWorking ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span className="text-xs sm:text-sm font-semibold text-white">Display panel working without lines/spots?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCondition('displayWorking', true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        condition.displayWorking ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCondition('displayWorking', false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !condition.displayWorking ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Black / Faulty
                    </button>
                  </div>
                </div>

                {/* Screen Cracked */}
                <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white">Is the front screen glass cracked?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCondition('screenCracked', false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !condition.screenCracked ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Intact Glass
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCondition('screenCracked', true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        condition.screenCracked ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Cracked Glass
                    </button>
                  </div>
                </div>

                {/* Water Damage */}
                <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white">Liquid or water contact history?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCondition('waterDamaged', false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !condition.waterDamaged ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      No Water
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCondition('waterDamaged', true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        condition.waterDamaged ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Water Damaged
                    </button>
                  </div>
                </div>

                {/* Motherboard */}
                <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white">Suspected motherboard / IC damage?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCondition('motherboardSuspectedDamaged', false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !condition.motherboardSuspectedDamaged ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Board OK
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCondition('motherboardSuspectedDamaged', true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        condition.motherboardSuspectedDamaged ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Board Fault
                    </button>
                  </div>
                </div>

                {/* Account Locked */}
                <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white">Locked / iCloud / Google account tied?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCondition('lockedOrAccountTied', false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        !condition.lockedOrAccountTied ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Unlocked
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCondition('lockedOrAccountTied', true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        condition.lockedOrAccountTied ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'glass-card text-slate-400 border-white/5'
                      }`}
                    >
                      Locked
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Model
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  <span>Review Valuation & Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: VALUATION BREAKDOWN & OPTIONAL PHOTOS */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">
                  Step 3: Indicative Offer & Device Photos
                </h2>
                <p className="text-xs text-slate-400">
                  Review the valuation breakdown and optionally upload photos for accurate remote assessment.
                </p>
              </div>

              {/* Price Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 text-center">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                  Estimated Buyback Offer
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  <span className="text-gradient-emerald">
                    {formatCurrency(valuation.minPrice)} – {formatCurrency(valuation.maxPrice)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                  {valuation.manualInspectionRequired
                    ? 'Requires physical bench evaluation due to multiple locked/board faults.'
                    : 'Calculated from baseline market prices, component salvage, and minimum scrap floor.'}
                </p>

                {/* Factors List */}
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-left text-xs">
                  {valuation.breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-400">
                      <span>{item.label}</span>
                      <span className="font-mono text-emerald-400/90">{item.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Photos Upload */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Upload Photos of the Phone (Optional, up to 4)
                  </label>
                  <span className="text-[11px] text-slate-500">Helps speed up physical inspection</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/20 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo} alt={`Damage photo ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {photos.length < 4 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-white/15 hover:border-emerald-500/40 glass-card flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-white transition-colors p-2 text-center"
                    >
                      <Upload className="w-5 h-5 text-emerald-400" />
                      <span className="text-[11px] font-medium">Add Photo</span>
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Change Condition
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  <span>Accept Estimate & Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONTACT & COLLECTION FORM */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">
                  Step 4: Contact & Collection Details
                </h2>
                <p className="text-xs text-slate-400">
                  Where and when should we schedule the doorstep evaluation?
                </p>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aamir Mir"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 94190 12345"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="aamir@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      City / Service Area in Kashmir *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900"
                    >
                      {BRAND_CONFIG.serviceAreas.map((c) => (
                        <option key={c} value={c} className="bg-slate-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pickup Method */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Pickup or Handover Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPickupMethod('pickup')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold ${
                        pickupMethod === 'pickup'
                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                          : 'glass-card border-white/10 text-slate-400'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>Doorstep Pickup (Free)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPickupMethod('dropoff')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold ${
                        pickupMethod === 'dropoff'
                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                          : 'glass-card border-white/10 text-slate-400'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-teal-400" />
                      <span>Service Center Drop-off</span>
                    </button>
                  </div>
                </div>

                {/* Address (only if pickup) */}
                {pickupMethod === 'pickup' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Complete Pickup Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Shop No, Street, Landmark, Area in Kashmir..."
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                )}

                {/* Preferred time slot */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Preferred Contact Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'morning', label: 'Morning (10 AM - 1 PM)' },
                      { id: 'afternoon', label: 'Afternoon (1 PM - 4 PM)' },
                      { id: 'evening', label: 'Evening (4 PM - 7 PM)' },
                      { id: 'anytime', label: 'Anytime' },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setPreferredContactTime(slot.id as 'morning' | 'afternoon' | 'evening' | 'anytime')}
                        className={`p-2.5 rounded-lg border text-xs font-medium ${
                          preferredContactTime === slot.id
                            ? 'bg-emerald-500/20 border-emerald-400 text-white'
                            : 'glass-card border-white/5 text-slate-400'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Notes */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Additional Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Original bill or box available, dropped in rain..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="glass-input w-full px-4 py-2 rounded-xl text-sm"
                  />
                </div>

                {/* Consent Notice */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed">
                      I understand that the valuation of{' '}
                      <strong className="text-emerald-400">
                        {formatCurrency(valuation.minPrice)} – {formatCurrency(valuation.maxPrice)}
                      </strong>{' '}
                      is an indicative estimate subject to physical inspection. I agree to backup/wipe my personal data where possible.
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Review
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Selling Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS & CONFIRMATION */}
          {step === 5 && submittedRequest && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Request Successfully Registered
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Thank You, {submittedRequest.customerName}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Our evaluation technician will reach out to you within our operating hours to verify your details.
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 max-w-sm mx-auto">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-0.5">
                  Your Public Reference ID
                </span>
                <span className="text-2xl font-mono font-bold text-emerald-400 tracking-wider">
                  {submittedRequest.referenceId}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Save this code to track your request status online.
                </span>
              </div>

              {/* Summary of submitted request */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="font-semibold text-slate-200 border-b border-white/10 pb-2 flex justify-between">
                  <span>Device & Estimated Valuation</span>
                  <span className="text-emerald-400">
                    {formatCurrency(submittedRequest.estimatedMinPrice)} – {formatCurrency(submittedRequest.estimatedMaxPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Device:</span>
                  <span className="text-white font-medium">
                    {submittedRequest.brandName} {submittedRequest.modelName} ({submittedRequest.storage})
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Location:</span>
                  <span className="text-white font-medium">{submittedRequest.city} ({submittedRequest.pickupMethod})</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Contact:</span>
                  <span className="text-white font-medium">{submittedRequest.customerPhone}</span>
                </div>
                <div className="pt-2 text-[11px] text-slate-500 border-t border-white/5 leading-relaxed">
                  <strong>Notice:</strong> This estimate is based on self-reported condition. Final payment is confirmed after hands-on bench verification by our technician.
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi Reboot Scrap, I submitted request ${submittedRequest.referenceId} for my ${submittedRequest.modelName}. Please confirm pickup.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>

                <a
                  href={`/track?ref=${submittedRequest.referenceId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white border border-white/10"
                >
                  <span>Track Request Status</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSubmittedRequest(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Sell Another Phone
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
