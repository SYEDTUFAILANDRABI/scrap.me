'use client';

import React from 'react';

export function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Emerald Glow */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-25 animate-ambient-glow"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.15) 70%, transparent 100%)',
        }}
      />

      {/* Top Right Cyan Glow */}
      <div
        className="absolute top-[20%] -right-[15%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(2,132,199,0.1) 70%, transparent 100%)',
          animation: 'float-glow 16s ease-in-out infinite reverse',
        }}
      />

      {/* Center Subtle Deep Navy/Indigo */}
      <div
        className="absolute top-[55%] left-[25%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(67,56,202,0.05) 70%, transparent 100%)',
        }}
      />

      {/* Bottom Emerald Subtle Glow */}
      <div
        className="absolute -bottom-[10%] right-[10%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(34,197,94,0.08) 70%, transparent 100%)',
        }}
      />

      {/* Subtle Noise / Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
