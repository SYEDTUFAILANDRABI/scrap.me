'use client';

import React from 'react';

export function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary Emerald — Top Left */}
      <div
        className="absolute -top-[15%] -left-[15%] w-[650px] h-[650px] rounded-full blur-[160px] animate-ambient-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(5,150,105,0.12) 60%, transparent 80%)',
        }}
      />

      {/* Cyan — Top Right */}
      <div
        className="absolute top-[15%] -right-[20%] w-[700px] h-[700px] rounded-full blur-[180px] animate-ambient-glow-reverse"
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(2,132,199,0.08) 60%, transparent 80%)',
        }}
      />

      {/* Indigo — Centre */}
      <div
        className="absolute top-[50%] left-[20%] w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.12]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(67,56,202,0.05) 60%, transparent 80%)',
          animation: 'float-glow 20s ease-in-out infinite',
        }}
      />

      {/* Emerald — Bottom Right */}
      <div
        className="absolute -bottom-[15%] right-[5%] w-[600px] h-[600px] rounded-full blur-[160px] animate-ambient-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(34,197,94,0.06) 60%, transparent 80%)',
          animationDelay: '5s',
        }}
      />

      {/* Teal — Bottom Left */}
      <div
        className="absolute bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[140px] animate-ambient-glow-reverse"
        style={{
          background:
            'radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(13,148,136,0.05) 60%, transparent 80%)',
          animationDelay: '8s',
        }}
      />

      {/* Subtle dot grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Very subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
