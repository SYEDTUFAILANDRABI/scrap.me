'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Search,
  Lock,
} from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sell Your Phone', href: '/sell' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Track Request', href: '/track' },
    { label: 'FAQs', href: '/#faqs' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel bg-slate-950/80 border-b border-white/10 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Tiny glowing dot */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white font-sans">
                    Reboot<span className="text-emerald-400">Scrap</span>
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-medium text-slate-400 -mt-1 hidden sm:block">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/track"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-white/10"
                title="Track Request"
              >
                <Search className="w-4 h-4" />
              </Link>

              <Link
                href="/admin"
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors"
                title="Admin Portal"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Admin</span>
              </Link>

              <Link
                href="/sell"
                className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:from-emerald-300 hover:to-teal-200 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Get My Price</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/sell"
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-emerald-500 text-slate-950"
              >
                Get Price
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 sm:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-900 border border-transparent hover:border-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/track"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 text-slate-300 text-sm font-medium border border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-400" /> Track Existing Request
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 text-slate-300 text-sm font-medium border border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Admin Dashboard
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>

                <Link
                  href="/sell"
                  className="w-full py-3.5 text-center font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl shadow-lg shadow-emerald-500/25"
                >
                  Check Phone Value Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
