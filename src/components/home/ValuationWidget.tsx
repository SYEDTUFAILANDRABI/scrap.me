'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Search,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Flame,
  Check,
  Zap,
} from 'lucide-react';
import { INITIAL_BRANDS, INITIAL_MODELS } from '@/lib/storage';
import { calculateValuation } from '@/lib/valuation-engine';
import { ConditionAnswers, PhoneBrand, PhoneModel, ValuationResult } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { BRAND_CONFIG } from '@/config/brand';
import { ScrollReveal } from '@/components/common/ScrollReveal';

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

export function ValuationWidget() {
  const router = useRouter();

  // Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBrand, setSelectedBrand] = useState<PhoneBrand | null>(INITIAL_BRANDS[0]);
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(INITIAL_MODELS[0]);
  const [selectedStorage, setSelectedStorage] = useState<string>('128 GB');
  const [condition, setCondition] = useState<ConditionAnswers>(DEFAULT_CONDITION);
  const [modelSearchQuery, setModelSearchQuery] = useState('');

  // Available models filtered by brand and search query
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    return INITIAL_MODELS.filter(
      (m) =>
        m.brandId === selectedBrand.id &&
        m.name.toLowerCase().includes(modelSearchQuery.toLowerCase())
    );
  }, [selectedBrand, modelSearchQuery]);

  // When model changes, ensure storage is valid
  const handleSelectModel = (model: PhoneModel) => {
    setSelectedModel(model);
    if (!model.supportedStorage.includes(selectedStorage)) {
      setSelectedStorage(model.supportedStorage[0] || '128 GB');
    }
    setCurrentStep(3);
  };

  // Calculate live valuation
  const valuation: ValuationResult | null = useMemo(() => {
    if (!selectedModel) return null;
    return calculateValuation(selectedModel, selectedStorage, condition);
  }, [selectedModel, selectedStorage, condition]);

  const updateCondition = (field: keyof ConditionAnswers, value: boolean | string) => {
    setCondition((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Continue to /sell with state in sessionStorage
  const handleContinueToSell = () => {
    if (typeof window !== 'undefined' && selectedModel && selectedBrand) {
      sessionStorage.setItem(
        'reboot_scrap_quote',
        JSON.stringify({
          brand: selectedBrand,
          model: selectedModel,
          storage: selectedStorage,
          condition,
          valuation,
        })
      );
    }
    router.push('/sell?step=submission');
  };

  return (
    <section id="valuation-widget" className="relative py-24 z-10">
      <div className="section-glow-divider" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal effect="fade-up" className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Estimator Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Much Is Your Phone Worth?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Select your brand, model, and current condition to generate a realistic, condition-based scrap & buyback estimate in seconds.
          </p>
        </ScrollReveal>

        {/* Wizard Container */}
        <ScrollReveal effect="zoom-in" duration={0.65} delay={0.1}>
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Step Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                Step {currentStep} of 5:
                <span className="text-white">
                  {currentStep === 1 && 'Select Smartphone Brand'}
                  {currentStep === 2 && 'Select Model'}
                  {currentStep === 3 && 'Choose Storage Capacity'}
                  {currentStep === 4 && 'Condition & Diagnostic Check'}
                  {currentStep === 5 && 'Indicative Valuation Offer'}
                </span>
              </span>
              <span>{Math.round((currentStep / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                initial={{ width: '20%' }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Wizard Steps */}
          <AnimatePresence mode="wait">
            {/* STEP 1: CHOOSE BRAND */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Choose Your Phone Brand
                  </h3>
                  <p className="text-xs text-slate-400">
                    We accept major flagship and budget manufacturers.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {INITIAL_BRANDS.map((brand) => {
                    const isSelected = selectedBrand?.id === brand.id;
                    return (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => {
                          setSelectedBrand(brand);
                          // Auto pick first model of that brand
                          const firstModel = INITIAL_MODELS.find((m) => m.brandId === brand.id);
                          if (firstModel) setSelectedModel(firstModel);
                          setCurrentStep(2);
                        }}
                        className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                            : 'glass-card border-white/10 text-slate-300 hover:border-emerald-500/30 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center">
                          <Smartphone className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </div>
                        <span className="text-sm font-semibold text-center">{brand.name}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: CHOOSE MODEL */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Select {selectedBrand?.name} Model
                    </h3>
                    <p className="text-xs text-slate-400">
                      Pick your exact variant for precise parts valuation.
                    </p>
                  </div>
                  {/* Search filter */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter model name..."
                      value={modelSearchQuery}
                      onChange={(e) => setModelSearchQuery(e.target.value)}
                      className="glass-input pl-9 pr-4 py-2 rounded-xl text-xs w-full sm:w-56"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1">
                  {availableModels.length > 0 ? (
                    availableModels.map((model) => {
                      const isSelected = selectedModel?.id === model.id;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => handleSelectModel(model)}
                          className={`p-4 rounded-2xl flex items-center justify-between border text-left transition-all ${
                            isSelected
                              ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                              : 'glass-card border-white/10 text-slate-300 hover:border-emerald-500/30 hover:bg-slate-800/60 hover:text-white'
                          }`}
                        >
                          <div>
                            <span className="text-sm font-semibold block">{model.name}</span>
                            <span className="text-[11px] text-slate-400">
                              Scrap floor: {formatCurrency(model.scrapFloorValuation)}
                            </span>
                          </div>
                          <CheckCircle2
                            className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`}
                          />
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-8 text-center text-slate-400 text-sm">
                      No models matching &ldquo;{modelSearchQuery}&rdquo; under {selectedBrand?.name}.
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Brands
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: STORAGE */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Select Internal Storage Capacity
                  </h3>
                  <p className="text-xs text-slate-400">
                    Selected Device: <strong className="text-emerald-400">{selectedModel?.name}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(selectedModel?.supportedStorage || ['64 GB', '128 GB', '256 GB']).map((cap) => {
                    const isSelected = selectedStorage === cap;
                    return (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => {
                          setSelectedStorage(cap);
                          setCurrentStep(4);
                        }}
                        className={`p-5 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                            : 'glass-card border-white/10 text-slate-300 hover:border-emerald-500/30 hover:bg-slate-800/60'
                        }`}
                      >
                        <HardDrive className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className="text-base font-bold">{cap}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Model
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONDITION QUESTIONNAIRE */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Describe Phone Condition & Damage
                  </h3>
                  <p className="text-xs text-slate-400">
                    Answer accurately. Even totally dead, water-damaged, or cracked devices have real salvage value.
                  </p>
                </div>

                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                  {/* Q1: Power */}
                  <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${condition.powersOn ? 'text-emerald-400' : 'text-rose-400'}`} />
                      <div>
                        <div className="text-sm font-semibold text-white">Does the phone power on?</div>
                        <div className="text-xs text-slate-400">Shows boot logo, lights up, or vibrates</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCondition('powersOn', true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          condition.powersOn
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Yes, Powers On
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition('powersOn', false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          !condition.powersOn
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        No, Dead
                      </button>
                    </div>
                  </div>

                  {/* Q2: Display */}
                  <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Smartphone className={`w-5 h-5 ${condition.displayWorking ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <div>
                        <div className="text-sm font-semibold text-white">Is the display working?</div>
                        <div className="text-xs text-slate-400">Clear picture without bleeding spots or permanent lines</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCondition('displayWorking', true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          condition.displayWorking
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Working Display
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition('displayWorking', false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          !condition.displayWorking
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Blackout / Lines
                      </button>
                    </div>
                  </div>

                  {/* Q3: Screen Glass Crack */}
                  <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="text-sm font-semibold text-white">Is the screen glass cracked?</div>
                        <div className="text-xs text-slate-400">Hairline or shattered front glass</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCondition('screenCracked', false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          !condition.screenCracked
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Intact Glass
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition('screenCracked', true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          condition.screenCracked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Cracked / Broken
                      </button>
                    </div>
                  </div>

                  {/* Q4: Water Damage */}
                  <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="text-sm font-semibold text-white">Liquid or Water Damage?</div>
                        <div className="text-xs text-slate-400">Dropped in water, rain exposure, red LDI sticker</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCondition('waterDamaged', false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          !condition.waterDamaged
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        No Water Contact
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition('waterDamaged', true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          condition.waterDamaged
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Water Damaged
                      </button>
                    </div>
                  </div>

                  {/* Q5: Motherboard / IC Issue */}
                  <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm font-semibold text-white">Suspected Motherboard / IC Failure?</div>
                        <div className="text-xs text-slate-400">Declared unrepairable by local technician, heating up</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCondition('motherboardSuspectedDamaged', false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          !condition.motherboardSuspectedDamaged
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Board OK / Unknown
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition('motherboardSuspectedDamaged', true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          condition.motherboardSuspectedDamaged
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Motherboard Fault
                      </button>
                    </div>
                  </div>

                  {/* Q6: Locked / Reset Status */}
                  <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="text-sm font-semibold text-white">Is phone locked / Unable to reset?</div>
                        <div className="text-xs text-slate-400">iCloud / Mi / FRP lock or forgotten passcode</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCondition('lockedOrAccountTied', false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          !condition.lockedOrAccountTied
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Unlocked / Can Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition('lockedOrAccountTied', true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          condition.lockedOrAccountTied
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900/60 text-slate-400 border-white/5'
                        }`}
                      >
                        Locked / Unknown
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Storage
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                  >
                    Calculate Value <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: SHOW ESTIMATED VALUE */}
            {currentStep === 5 && valuation && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Result Price Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-2xl relative overflow-hidden text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                    <Check className="w-3.5 h-3.5" /> Condition Valuation Calculated
                  </div>

                  <h3 className="text-sm font-semibold text-slate-300">
                    Estimated Value for {selectedBrand?.name} {selectedModel?.name} ({selectedStorage})
                  </h3>

                  {valuation.manualInspectionRequired ? (
                    <div className="my-5 p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-sm max-w-lg mx-auto">
                      <div className="font-bold flex items-center justify-center gap-2 mb-1 text-base text-amber-300">
                        <AlertCircle className="w-5 h-5" /> Manual Inspection Required
                      </div>
                      <p className="text-xs leading-relaxed text-amber-200/90">
                        {valuation.manualReason}
                      </p>
                      <div className="mt-3 text-xs font-bold text-white">
                        Estimated salvage floor: {formatCurrency(valuation.minPrice)} – {formatCurrency(valuation.maxPrice)}
                      </div>
                    </div>
                  ) : (
                    <div className="my-5">
                      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                        <span className="text-gradient-emerald">
                          {formatCurrency(valuation.minPrice)} – {formatCurrency(valuation.maxPrice)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        Indicative estimate based on recoverable parts and metal salvage.
                      </p>
                    </div>
                  )}

                  {/* Breakdown details */}
                  <div className="text-left bg-slate-950/60 rounded-xl p-4 border border-white/5 mt-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>Valuation Factors</span>
                      <span className="text-slate-500">Breakdown</span>
                    </div>
                    {valuation.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-1.5">
                        <span className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.type === 'base' ? 'bg-emerald-400' : 'bg-rose-400'
                            }`}
                          />
                          {item.label}
                        </span>
                        <span
                          className={`font-mono text-[11px] ${
                            item.type === 'base' ? 'text-emerald-400' : 'text-slate-400'
                          }`}
                        >
                          {item.impact}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Disclaimer notice */}
                  <div className="text-[11px] text-slate-500 mt-4 leading-relaxed max-w-xl mx-auto">
                    <strong>Disclaimer:</strong> {BRAND_CONFIG.disclaimers.valuation}
                  </div>
                </div>

                {/* Next Step Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/20"
                  >
                    <RotateCcw className="w-4 h-4" /> Change Phone Details
                  </button>

                  <button
                    type="button"
                    onClick={handleContinueToSell}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-300 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Accept Estimate & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
