'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AmbientGlow } from '@/components/common/AmbientGlow';
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  MapPin,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { SellingRequest, RequestStatus } from '@/types';
import { formatCurrency, formatDate, getStatusBadgeInfo } from '@/lib/utils';
import { BRAND_CONFIG } from '@/config/brand';

function TrackContent() {
  const searchParams = useSearchParams();
  const [referenceId, setReferenceId] = useState('');
  const [request, setRequest] = useState<SellingRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequest = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/requests/${encodeURIComponent(ref.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No matching request found for this reference code');
      }
      setRequest(data.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to retrieve request details';
      setError(message);
      setRequest(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setReferenceId(refFromUrl);
      fetchRequest(refFromUrl);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequest(referenceId);
  };

  const statusBadge = request ? getStatusBadgeInfo(request.status) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Heading */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Search className="w-3.5 h-3.5 text-emerald-400" />
          <span>Live Lifecycle Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Track Your Phone Request
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
          Enter the Reference ID generated upon submitting your valuation to view its live inspection and payout status.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. RS-2026-9A4B1"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-base font-mono uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 transition-all shrink-0"
          >
            {loading ? 'Searching...' : 'Track Request'}
          </button>
        </form>

        {/* Demo references helper */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>Try demo IDs:</span>
          {['RS-2026-9A4B1', 'RS-2026-3C7E8', 'RS-2026-8D2F4'].map((demo) => (
            <button
              key={demo}
              type="button"
              onClick={() => {
                setReferenceId(demo);
                fetchRequest(demo);
              }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-emerald-400 hover:text-emerald-300 font-mono text-[11px]"
            >
              {demo}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3 mb-8">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Request Details View */}
      {request && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Reference Code
                </span>
                <h2 className="text-2xl font-mono font-black text-white">
                  {request.referenceId}
                </h2>
                <div className="text-xs text-slate-400 mt-1">
                  Submitted on {formatDate(request.createdAt)}
                </div>
              </div>

              {statusBadge && (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Current Lifecycle State
                  </span>
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${statusBadge.bg}`}
                  >
                    {statusBadge.label}
                  </span>
                </div>
              )}
            </div>

            {/* Device & Valuation Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Device Hardware
                </span>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>
                    {request.brandName} {request.modelName} ({request.storage})
                  </span>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Power State: {request.condition.powersOn ? 'Powers On' : 'Completely Dead'}</div>
                  <div>Display: {request.condition.displayWorking ? 'Display OK' : 'Faulty / Blackout'}</div>
                  <div>Glass: {request.condition.screenCracked ? 'Cracked' : 'Intact'}</div>
                  <div>Water Damage: {request.condition.waterDamaged ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Valuation Assessment
                </span>
                <div className="text-xs text-slate-400">
                  Initial Online Estimate:
                  <span className="text-white font-mono font-bold block text-sm mt-0.5">
                    {formatCurrency(request.estimatedMinPrice)} – {formatCurrency(request.estimatedMaxPrice)}
                  </span>
                </div>

                {request.adminOfferPrice ? (
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[11px] text-emerald-400 font-bold uppercase block">
                      Verified Final Offer:
                    </span>
                    <span className="text-2xl font-black text-emerald-300 font-mono">
                      {formatCurrency(request.adminOfferPrice)}
                    </span>
                    {request.adminOfferReason && (
                      <p className="text-xs text-slate-300 mt-1 italic">
                        &ldquo;{request.adminOfferReason}&rdquo;
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-amber-300/90 pt-1">
                    Pending physical bench inspection by technician.
                  </div>
                )}
              </div>
            </div>

            {/* Handover Details */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {request.pickupMethod === 'pickup' ? 'Doorstep Pickup' : 'Service Drop-off'} at {request.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Preferred slot: {request.preferredContactTime}</span>
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Inspection & Activity Log</span>
            </h3>

            <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
              {request.auditLog.map((log, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
                  <div className="text-xs text-slate-400">{formatDate(log.timestamp)}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{log.note}</div>
                  {log.adminName && (
                    <div className="text-[11px] text-slate-500">Updated by: {log.adminName}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Help Contact Card */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Need to reschedule or update details?</h4>
              <p className="text-xs text-slate-400">
                Contact our customer support team directly with your reference number.
              </p>
            </div>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello, I want to inquire about my request ${request.referenceId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="relative min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 relative z-10 pt-24">
        <Suspense fallback={<div className="text-center py-24 text-slate-400 text-sm">Loading tracker...</div>}>
          <TrackContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
