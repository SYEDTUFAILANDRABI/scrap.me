'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Plus,
  Edit,
  Save,
  RotateCcw,
  Sliders,
  MapPin,
  Settings,
  MessageCircle,
  LogOut,
  ChevronRight,
  TrendingUp,
  Coins,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import {
  SellingRequest,
  RequestStatus,
  PhoneBrand,
  PhoneModel,
  ValuationRule,
  BusinessSettings,
} from '@/types';
import { formatCurrency, formatDate, getStatusBadgeInfo } from '@/lib/utils';
import { BRAND_CONFIG, DEFAULT_BUSINESS_SETTINGS } from '@/config/brand';

const STATUS_OPTIONS: { id: RequestStatus; label: string }[] = [
  { id: 'new', label: 'New Request' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'inspection_scheduled', label: 'Inspection Scheduled' },
  { id: 'inspected', label: 'Device Inspected' },
  { id: 'final_offer_made', label: 'Final Offer Made' },
  { id: 'offer_accepted', label: 'Offer Accepted' },
  { id: 'pickup_pending', label: 'Pickup / Handover Pending' },
  { id: 'purchased', label: 'Purchased & Paid' },
  { id: 'cancelled', label: 'Cancelled / Rejected' },
];

export default function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'requests' | 'inventory' | 'rules' | 'settings'>('requests');

  // Requests state
  const [requests, setRequests] = useState<SellingRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<SellingRequest | null>(null);

  // Modal actions
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [newOfferPrice, setNewOfferPrice] = useState<number>(0);
  const [newOfferReason, setNewOfferReason] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<RequestStatus>('contacted');
  const [statusNote, setStatusNote] = useState('');

  // Inventory state
  const [brands, setBrands] = useState<PhoneBrand[]>([]);
  const [models, setModels] = useState<PhoneModel[]>([]);
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [newModelBrandId, setNewModelBrandId] = useState('b-apple');
  const [newModelBasePrice, setNewModelBasePrice] = useState(20000);
  const [newModelScrapPrice, setNewModelScrapPrice] = useState(2500);

  // Settings State
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_BUSINESS_SETTINGS);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // Check persisted session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('reboot_scrap_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch Requests
  const loadRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch {
      // ignore
    } finally {
      setLoadingRequests(false);
    }
  };

  // Fetch Inventory
  const loadInventory = async () => {
    try {
      const [bRes, mRes, sRes] = await Promise.all([
        fetch('/api/brands'),
        fetch('/api/models?all=true'),
        fetch('/api/settings'),
      ]);
      const [bData, mData, sData] = await Promise.all([bRes.json(), mRes.json(), sRes.json()]);
      if (bData.success) setBrands(bData.data);
      if (mData.success) setModels(mData.data);
      if (sData.success) setSettings(sData.data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRequests();
      loadInventory();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode is "admin" or "kashmir2026"
    if (adminPasscode === 'admin' || adminPasscode === 'kashmir2026' || adminPasscode === 'reboot123') {
      setIsAuthenticated(true);
      setAuthError(null);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('reboot_scrap_admin_auth', 'true');
      }
    } else {
      setAuthError('Invalid passcode. Use demo passcode "admin"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('reboot_scrap_admin_auth');
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = requests.length;
    const pendingInspections = requests.filter(
      (r) => r.status === 'new' || r.status === 'contacted' || r.status === 'inspection_scheduled'
    ).length;
    const offersMade = requests.filter((r) => r.status === 'final_offer_made').length;
    const accepted = requests.filter((r) => r.status === 'offer_accepted' || r.status === 'pickup_pending').length;
    const purchased = requests.filter((r) => r.status === 'purchased').length;
    const cancelled = requests.filter((r) => r.status === 'cancelled').length;
    const totalPurchasedValue = requests
      .filter((r) => r.status === 'purchased')
      .reduce((sum, r) => sum + (r.adminOfferPrice || r.estimatedMinPrice), 0);

    return { total, pendingInspections, offersMade, accepted, purchased, cancelled, totalPurchasedValue };
  }, [requests]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    let list = [...requests];
    if (statusFilter !== 'all') {
      list = list.filter((r) => r.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.referenceId.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.customerPhone.toLowerCase().includes(q) ||
          r.modelName.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q)
      );
    }
    return list;
  }, [requests, statusFilter, searchQuery]);

  // Update Status
  const handleUpdateStatus = async () => {
    if (!selectedRequest) return;
    try {
      const res = await fetch(`/api/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: targetStatus,
          note: statusNote || `Status changed to ${targetStatus}`,
          adminName: 'Admin',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedRequest(data.data);
        setIsStatusModalOpen(false);
        setStatusNote('');
        loadRequests();
      }
    } catch {
      alert('Failed to update status');
    }
  };

  // Make Offer
  const handleMakeOffer = async () => {
    if (!selectedRequest || newOfferPrice <= 0) return;
    try {
      const res = await fetch(`/api/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'make_offer',
          offerPrice: newOfferPrice,
          reason: newOfferReason || 'Bench diagnosis completed',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedRequest(data.data);
        setIsOfferModalOpen(false);
        setNewOfferReason('');
        loadRequests();
      }
    } catch {
      alert('Failed to update offer');
    }
  };

  // Add Model
  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId: newModelBrandId,
          name: newModelName,
          baseValuation: newModelBasePrice,
          scrapFloorValuation: newModelScrapPrice,
          supportedStorage: ['128 GB', '256 GB'],
          active: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModelOpen(false);
        setNewModelName('');
        loadInventory();
      }
    } catch {
      alert('Failed to add model');
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSettingsSuccess(true);
        setTimeout(() => setSaveSettingsSuccess(false), 3000);
      }
    } catch {
      alert('Failed to save settings');
    }
  };

  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b12] text-slate-100 flex items-center justify-center p-4">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 max-w-md w-full shadow-2xl relative text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold text-white">Reboot Scrap Portal</h1>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Authorized administrator access for requests, valuations & inventory.
          </p>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-4">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode..."
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Demo passcode: <strong className="text-emerald-400">admin</strong>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link href="/" className="text-xs text-slate-400 hover:text-emerald-400">
              ← Return to Reboot Scrap Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col">
      {/* Admin Topbar */}
      <header className="glass-panel border-b border-white/10 py-3.5 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                RS
              </div>
              <span className="text-lg font-bold text-white hidden sm:inline">
                Reboot<span className="text-emerald-400">Scrap</span>
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
              Admin Ops
            </span>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'requests', label: 'Requests', count: requests.length },
              { id: 'inventory', label: 'Models & Base', count: models.length },
              { id: 'settings', label: 'Business Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'requests' | 'inventory' | 'settings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/api/export"
              target="_blank"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card border border-white/10 text-xs font-medium text-slate-300 hover:text-white"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: REQUESTS DASHBOARD */}
        {activeTab === 'requests' && (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-[11px] text-slate-400 font-medium block">Total Leads</span>
                <span className="text-2xl font-black text-white mt-1 block">{stats.total}</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                <span className="text-[11px] text-amber-300 font-medium block">Pending Inspection</span>
                <span className="text-2xl font-black text-amber-300 mt-1 block">{stats.pendingInspections}</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                <span className="text-[11px] text-blue-300 font-medium block">Offers Made</span>
                <span className="text-2xl font-black text-blue-300 mt-1 block">{stats.offersMade}</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5">
                <span className="text-[11px] text-teal-300 font-medium block">Accepted / Handover</span>
                <span className="text-2xl font-black text-teal-300 mt-1 block">{stats.accepted}</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <span className="text-[11px] text-emerald-300 font-medium block">Purchased & Paid</span>
                <span className="text-2xl font-black text-emerald-300 mt-1 block">{stats.purchased}</span>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-[11px] text-slate-400 font-medium block">Payout Total</span>
                <span className="text-xl font-bold text-white mt-1 block font-mono">
                  {formatCurrency(stats.totalPurchasedValue)}
                </span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter name, phone, ref, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-9 pr-3 py-1.5 rounded-xl text-xs"
                />
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    statusFilter === 'all'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'glass-card text-slate-400 hover:text-white'
                  }`}
                >
                  All ({requests.length})
                </button>
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStatusFilter(opt.id)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      statusFilter === opt.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests Table */}
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Device & Storage</th>
                      <th className="py-3 px-4">Condition</th>
                      <th className="py-3 px-4">Estimated Value</th>
                      <th className="py-3 px-4">Final Offer</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRequests.map((req) => {
                      const badge = getStatusBadgeInfo(req.status);
                      return (
                        <tr
                          key={req.id}
                          className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                          onClick={() => setSelectedRequest(req)}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                            {req.referenceId}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{req.customerName}</div>
                            <div className="text-[11px] text-slate-400">
                              {req.customerPhone} • {req.city}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            {req.brandName} {req.modelName}
                            <span className="text-slate-400 ml-1">({req.storage})</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                                req.condition.powersOn
                                  ? 'bg-blue-500/10 text-blue-300'
                                  : 'bg-rose-500/10 text-rose-300'
                              }`}
                            >
                              {req.condition.powersOn ? 'Powers On' : 'Dead Unit'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-300">
                            {formatCurrency(req.estimatedMinPrice)} – {formatCurrency(req.estimatedMaxPrice)}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            {req.adminOfferPrice ? (
                              <span className="text-emerald-400">
                                {formatCurrency(req.adminOfferPrice)}
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[11px]">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRequest(req);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-emerald-400 hover:text-white text-xs font-semibold"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredRequests.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No requests matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & BASE VALUATIONS */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Configurable Phone Models & Pricing</h2>
                <p className="text-xs text-slate-400">
                  Update baseline pristine values and scrap floor prices per model.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModelOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Add New Model
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((model) => (
                <div key={model.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{model.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                      {brands.find((b) => b.id === model.brandId)?.name || 'Generic'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Working Baseline:</span>
                      <span className="font-mono font-bold text-white">{formatCurrency(model.baseValuation)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Minimum Scrap Floor:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {formatCurrency(model.scrapFloorValuation)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Supported Storage:</span>
                      <span className="text-slate-300">{model.supportedStorage.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Business Contact & Region Config</h2>
                <p className="text-xs text-slate-400">
                  Configure local Kashmiri service areas, operational contact numbers, and legal disclaimers.
                </p>
              </div>

              {saveSettingsSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Business settings updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settings.contactWhatsApp}
                      onChange={(e) => setSettings({ ...settings, contactWhatsApp: e.target.value })}
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Office / Collection Hub Address</label>
                  <input
                    type="text"
                    value={settings.officeAddress}
                    onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                    className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Configured Service Areas (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={settings.serviceAreas.join(', ')}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        serviceAreas: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    className="glass-input w-full px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs"
                >
                  Save Business Settings
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* INSPECT REQUEST MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Request Detail
                </span>
                <h3 className="text-2xl font-mono font-bold text-white">
                  {selectedRequest.referenceId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer Contact Details */}
            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider block">
                Customer & Collection Info
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>
                  Name: <strong className="text-white">{selectedRequest.customerName}</strong>
                </div>
                <div>
                  Phone: <strong className="text-white">{selectedRequest.customerPhone}</strong>
                </div>
                <div>
                  City: <strong className="text-white">{selectedRequest.city}</strong>
                </div>
                <div>
                  Method: <strong className="text-white">{selectedRequest.pickupMethod}</strong>
                </div>
                {selectedRequest.pickupAddress && (
                  <div className="col-span-2">
                    Address: <strong className="text-white">{selectedRequest.pickupAddress}</strong>
                  </div>
                )}
                {selectedRequest.customerNotes && (
                  <div className="col-span-2 italic text-slate-400">
                    Notes: &ldquo;{selectedRequest.customerNotes}&rdquo;
                  </div>
                )}
              </div>

              {/* WhatsApp direct trigger */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${selectedRequest.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${selectedRequest.customerName}, this is Reboot Scrap regarding your selling request ${selectedRequest.referenceId} for ${selectedRequest.modelName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Message Customer on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Device & Valuation */}
            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider block">
                Device Diagnostics
              </span>
              <div className="text-sm font-bold text-white">
                {selectedRequest.brandName} {selectedRequest.modelName} ({selectedRequest.storage})
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-400 pt-1">
                <div>Powers On: {selectedRequest.condition.powersOn ? 'YES' : 'NO (DEAD)'}</div>
                <div>Display Working: {selectedRequest.condition.displayWorking ? 'YES' : 'NO'}</div>
                <div>Glass Cracked: {selectedRequest.condition.screenCracked ? 'YES' : 'NO'}</div>
                <div>Water Damaged: {selectedRequest.condition.waterDamaged ? 'YES' : 'NO'}</div>
                <div>Motherboard: {selectedRequest.condition.motherboardSuspectedDamaged ? 'FAULT' : 'OK'}</div>
                <div>Account Locked: {selectedRequest.condition.lockedOrAccountTied ? 'YES' : 'NO'}</div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block text-[11px]">Online Estimate:</span>
                  <span className="text-sm font-mono font-bold text-slate-200">
                    {formatCurrency(selectedRequest.estimatedMinPrice)} – {formatCurrency(selectedRequest.estimatedMaxPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Final Offer:</span>
                  <span className="text-base font-mono font-black text-emerald-400">
                    {selectedRequest.adminOfferPrice ? formatCurrency(selectedRequest.adminOfferPrice) : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Update status & Make offer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setTargetStatus(selectedRequest.status);
                  setIsStatusModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl glass-card border border-white/10 text-xs font-semibold text-slate-200 hover:text-white"
              >
                Change Status
              </button>

              <button
                type="button"
                onClick={() => {
                  setNewOfferPrice(selectedRequest.adminOfferPrice || selectedRequest.estimatedMinPrice);
                  setIsOfferModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs"
              >
                Set / Adjust Offer Price
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADJUST OFFER MODAL */}
      {isOfferModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Set Verified Final Offer</h3>
            <p className="text-xs text-slate-400">
              Record the technician bench-test offer price for {selectedRequest.referenceId}.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Final Offer (₹)</label>
                <input
                  type="number"
                  value={newOfferPrice}
                  onChange={(e) => setNewOfferPrice(Number(e.target.value))}
                  className="glass-input w-full px-4 py-2.5 rounded-xl text-base font-bold font-mono text-emerald-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Reason for Valuation Adjustment</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Display backlight intact, minor corrosion on speaker board..."
                  value={newOfferReason}
                  onChange={(e) => setNewOfferReason(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMakeOffer}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Save & Notify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE STATUS MODAL */}
      {isStatusModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/20 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Update Lifecycle Status</h3>
            <p className="text-xs text-slate-400">Request: {selectedRequest.referenceId}</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Target Status</label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value as RequestStatus)}
                  className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-slate-900">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Audit Log Note</label>
                <input
                  type="text"
                  placeholder="e.g. Scheduled for Wednesday 2 PM in Srinagar"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODEL MODAL */}
      {isAddModelOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add New Smartphone Model</h3>

            <form onSubmit={handleAddModel} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Brand</label>
                <select
                  value={newModelBrandId}
                  onChange={(e) => setNewModelBrandId(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-xl text-xs bg-slate-900"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id} className="bg-slate-900">
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Model Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 15 Pro Max"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  className="glass-input w-full px-4 py-2 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Pristine Base (₹)</label>
                  <input
                    type="number"
                    required
                    value={newModelBasePrice}
                    onChange={(e) => setNewModelBasePrice(Number(e.target.value))}
                    className="glass-input w-full px-4 py-2 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Scrap Floor (₹)</label>
                  <input
                    type="number"
                    required
                    value={newModelScrapPrice}
                    onChange={(e) => setNewModelScrapPrice(Number(e.target.value))}
                    className="glass-input w-full px-4 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModelOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Save Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
