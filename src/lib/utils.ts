import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return dateString;
  }
}

export function generateReferenceId(): string {
  const currentYear = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomCode = '';
  for (let i = 0; i < 5; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RS-${currentYear}-${randomCode}`;
}

export function getStatusBadgeInfo(status: string) {
  switch (status) {
    case 'new':
      return { label: 'New Request', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
    case 'contacted':
      return { label: 'Contacted', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    case 'inspection_scheduled':
      return { label: 'Inspection Scheduled', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
    case 'inspected':
      return { label: 'Device Inspected', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
    case 'final_offer_made':
      return { label: 'Final Offer Made', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    case 'offer_accepted':
      return { label: 'Offer Accepted', bg: 'bg-teal-500/10 text-teal-400 border-teal-500/20' };
    case 'pickup_pending':
      return { label: 'Handover Pending', bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' };
    case 'purchased':
      return { label: 'Purchased & Paid', bg: 'bg-green-500/20 text-green-300 border-green-500/30' };
    case 'cancelled':
      return { label: 'Cancelled / Rejected', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
    default:
      return { label: status, bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
  }
}
