'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import {
  Camera,
  Cpu,
  Battery,
  Monitor,
  Speaker,
  Fingerprint,
  Recycle,
  Coins,
  ArrowDown,
} from 'lucide-react';

/* ── Individual Phone Part ──────────────────────────── */

interface PartProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  glowColor: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}

function PhonePart({
  label,
  icon,
  color,
  borderColor,
  glowColor,
  x,
  y,
  rotate,
  scale,
  opacity,
}: PartProps) {
  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="absolute flex flex-col items-center gap-1.5 pointer-events-none"
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border backdrop-blur-xl"
        style={{
          background: color,
          borderColor,
          boxShadow: `0 8px 32px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-wide uppercase whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main Disassembly Section ───────────────────────── */

export function PhoneDisassembly() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smoother spring-based progress
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── Phone Body (the whole phone shrinks and fades) ── */
  const phoneScale = useTransform(progress, [0, 0.15, 0.35, 0.5], [0.85, 1, 0.7, 0.3]);
  const phoneOpacity = useTransform(progress, [0, 0.12, 0.35, 0.45], [0, 1, 0.6, 0]);
  const phoneY = useTransform(progress, [0, 0.15, 0.4], [60, 0, -30]);
  const phoneRotate = useTransform(progress, [0.2, 0.4], [0, -5]);

  /* ── Crack Overlay ── */
  const crackOpacity = useTransform(progress, [0.12, 0.2, 0.32], [0, 1, 0.4]);
  const crackScale = useTransform(progress, [0.12, 0.25], [0.8, 1.1]);

  /* ── Individual Parts: explode outward after phone fades ── */
  // Screen
  const screenX = useTransform(progress, [0.3, 0.5, 0.75], [0, -140, -40]);
  const screenY = useTransform(progress, [0.3, 0.5, 0.75], [0, -80, 20]);
  const screenRotate = useTransform(progress, [0.3, 0.5, 0.75], [0, -15, -3]);
  const screenScale = useTransform(progress, [0.3, 0.42, 0.5, 0.75], [0, 0.5, 1, 0.85]);
  const screenOpacity = useTransform(progress, [0.3, 0.42, 0.8, 0.9], [0, 1, 1, 0]);

  // Battery
  const batteryX = useTransform(progress, [0.32, 0.52, 0.75], [0, 130, 30]);
  const batteryY = useTransform(progress, [0.32, 0.52, 0.75], [0, -60, 30]);
  const batteryRotate = useTransform(progress, [0.32, 0.52, 0.75], [0, 12, 2]);
  const batteryScale = useTransform(progress, [0.32, 0.44, 0.52, 0.75], [0, 0.5, 1, 0.85]);
  const batteryOpacity = useTransform(progress, [0.32, 0.44, 0.8, 0.9], [0, 1, 1, 0]);

  // Camera
  const cameraX = useTransform(progress, [0.34, 0.54, 0.75], [0, -100, -50]);
  const cameraY = useTransform(progress, [0.34, 0.54, 0.75], [0, 90, 50]);
  const cameraRotate = useTransform(progress, [0.34, 0.54, 0.75], [0, -20, -5]);
  const cameraScale = useTransform(progress, [0.34, 0.46, 0.54, 0.75], [0, 0.5, 1, 0.85]);
  const cameraOpacity = useTransform(progress, [0.34, 0.46, 0.8, 0.9], [0, 1, 1, 0]);

  // Motherboard
  const boardX = useTransform(progress, [0.36, 0.56, 0.75], [0, 110, 60]);
  const boardY = useTransform(progress, [0.36, 0.56, 0.75], [0, 70, 40]);
  const boardRotate = useTransform(progress, [0.36, 0.56, 0.75], [0, 18, 4]);
  const boardScale = useTransform(progress, [0.36, 0.48, 0.56, 0.75], [0, 0.5, 1, 0.85]);
  const boardOpacity = useTransform(progress, [0.36, 0.48, 0.8, 0.9], [0, 1, 1, 0]);

  // Speaker
  const speakerX = useTransform(progress, [0.38, 0.58, 0.75], [0, -50, -20]);
  const speakerY = useTransform(progress, [0.38, 0.58, 0.75], [0, 130, 80]);
  const speakerRotate = useTransform(progress, [0.38, 0.58, 0.75], [0, -10, -2]);
  const speakerScale = useTransform(progress, [0.38, 0.50, 0.58, 0.75], [0, 0.5, 1, 0.85]);
  const speakerOpacity = useTransform(progress, [0.38, 0.50, 0.8, 0.9], [0, 1, 1, 0]);

  // Sensor
  const sensorX = useTransform(progress, [0.40, 0.60, 0.75], [0, 70, 10]);
  const sensorY = useTransform(progress, [0.40, 0.60, 0.75], [0, -120, -40]);
  const sensorRotate = useTransform(progress, [0.40, 0.60, 0.75], [0, 25, 6]);
  const sensorScale = useTransform(progress, [0.40, 0.52, 0.60, 0.75], [0, 0.5, 1, 0.85]);
  const sensorOpacity = useTransform(progress, [0.40, 0.52, 0.8, 0.9], [0, 1, 1, 0]);

  /* ── Recycling bin / value reveal at end ── */
  const recycleScale = useTransform(progress, [0.7, 0.85, 0.95], [0, 1, 1.05]);
  const recycleOpacity = useTransform(progress, [0.7, 0.82], [0, 1]);
  const recycleY = useTransform(progress, [0.7, 0.85], [40, 0]);

  const valueOpacity = useTransform(progress, [0.8, 0.92], [0, 1]);
  const valueY = useTransform(progress, [0.8, 0.92], [30, 0]);
  const valueScale = useTransform(progress, [0.8, 0.92], [0.9, 1]);

  /* ── Background glow intensity follows scroll ── */
  const glowOpacity = useTransform(progress, [0.2, 0.5, 0.8], [0.1, 0.4, 0.2]);
  const glowScale = useTransform(progress, [0.2, 0.5, 0.8], [0.8, 1.3, 1]);

  /* ── "Scroll to explore" indicator ── */
  const scrollHintOpacity = useTransform(progress, [0, 0.08, 0.15], [1, 0.6, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10"
      style={{ height: '250vh' }} /* tall to give scroll room */
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Reactive Glow */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.05) 60%, transparent 80%)',
            }}
          />
        </motion.div>

        {/* Content Container */}
        <div className="relative w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
          {/* Section Header (always visible) */}
          <motion.div
            style={{ opacity: useTransform(progress, [0, 0.08], [0, 1]) }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 block mb-2">
              The Journey
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              From Dead Phone to{' '}
              <span className="text-gradient-emerald">Real Value</span>
            </h2>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400"
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* ── THE PHONE ───────────────────────────── */}
          <motion.div
            style={{
              scale: phoneScale,
              opacity: phoneOpacity,
              y: phoneY,
              rotate: phoneRotate,
            }}
            className="relative w-52 sm:w-64"
          >
            {/* Phone Frame */}
            <div className="relative aspect-[9/18] rounded-[36px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-2 border-slate-600/60 shadow-2xl overflow-hidden">
              {/* Inner bezel glow */}
              <div className="absolute inset-[3px] rounded-[33px] border border-white/5" />

              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-950 rounded-full flex items-center justify-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
              </div>

              {/* Screen Glass Effect */}
              <div className="absolute inset-3 rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-950 to-black overflow-hidden">
                {/* Subtle screen reflection */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
                  }}
                />

                {/* Dead screen icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                    <Monitor className="w-7 h-7 text-rose-400/80" />
                  </div>
                  <span className="text-[11px] font-bold text-rose-300/70 uppercase tracking-widest">
                    Dead Unit
                  </span>
                  <div className="flex gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/20" />
                  </div>
                </div>
              </div>

              {/* Crack SVG Overlay */}
              <motion.svg
                style={{ opacity: crackOpacity, scale: crackScale }}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 100 200"
                fill="none"
              >
                <path
                  d="M35,15 L48,55 L38,75 L52,120 L42,165 M48,55 L75,40 L82,65 M48,55 L28,80 M52,120 L72,110 L80,135 M52,120 L35,145"
                  stroke="rgba(244,63,94,0.5)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M62,20 L55,50 M70,85 L58,100 L68,130"
                  stroke="rgba(244,63,94,0.3)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Bottom bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Phone shadow on surface */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/40 rounded-full blur-xl" />
          </motion.div>

          {/* ── EXPLODED PARTS ──────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full max-w-xl max-h-[500px]">
              {/* Center anchor point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <PhonePart
                  label="Display"
                  icon={<Monitor className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />}
                  color="rgba(30, 58, 138, 0.4)"
                  borderColor="rgba(59, 130, 246, 0.3)"
                  glowColor="rgba(59, 130, 246, 0.15)"
                  x={screenX}
                  y={screenY}
                  rotate={screenRotate}
                  scale={screenScale}
                  opacity={screenOpacity}
                />
                <PhonePart
                  label="Battery"
                  icon={<Battery className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />}
                  color="rgba(120, 53, 15, 0.4)"
                  borderColor="rgba(245, 158, 11, 0.3)"
                  glowColor="rgba(245, 158, 11, 0.15)"
                  x={batteryX}
                  y={batteryY}
                  rotate={batteryRotate}
                  scale={batteryScale}
                  opacity={batteryOpacity}
                />
                <PhonePart
                  label="Camera"
                  icon={<Camera className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />}
                  color="rgba(88, 28, 135, 0.4)"
                  borderColor="rgba(168, 85, 247, 0.3)"
                  glowColor="rgba(168, 85, 247, 0.15)"
                  x={cameraX}
                  y={cameraY}
                  rotate={cameraRotate}
                  scale={cameraScale}
                  opacity={cameraOpacity}
                />
                <PhonePart
                  label="Motherboard"
                  icon={<Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />}
                  color="rgba(6, 78, 59, 0.4)"
                  borderColor="rgba(16, 185, 129, 0.3)"
                  glowColor="rgba(16, 185, 129, 0.15)"
                  x={boardX}
                  y={boardY}
                  rotate={boardRotate}
                  scale={boardScale}
                  opacity={boardOpacity}
                />
                <PhonePart
                  label="Speaker"
                  icon={<Speaker className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />}
                  color="rgba(22, 78, 99, 0.4)"
                  borderColor="rgba(6, 182, 212, 0.3)"
                  glowColor="rgba(6, 182, 212, 0.15)"
                  x={speakerX}
                  y={speakerY}
                  rotate={speakerRotate}
                  scale={speakerScale}
                  opacity={speakerOpacity}
                />
                <PhonePart
                  label="Sensors"
                  icon={<Fingerprint className="w-7 h-7 sm:w-8 sm:h-8 text-rose-400" />}
                  color="rgba(136, 19, 55, 0.4)"
                  borderColor="rgba(244, 63, 94, 0.3)"
                  glowColor="rgba(244, 63, 94, 0.15)"
                  x={sensorX}
                  y={sensorY}
                  rotate={sensorRotate}
                  scale={sensorScale}
                  opacity={sensorOpacity}
                />
              </div>
            </div>
          </div>

          {/* ── RECYCLE BIN + VALUE REVEAL ──────────── */}
          <motion.div
            style={{
              opacity: recycleOpacity,
              scale: recycleScale,
              y: recycleY,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6"
          >
            {/* Glowing recycle ring */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl scale-150" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full glass-elevated border border-emerald-500/40 flex items-center justify-center animate-glow-pulse">
                <Recycle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
              </div>
            </div>

            <motion.div
              style={{ opacity: valueOpacity, y: valueY, scale: valueScale }}
              className="text-center space-y-3"
            >
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Every Part Has{' '}
                <span className="text-gradient-emerald">Real Value</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Camera sensors, OLED panels, lithium cells, CNC metal frames, speaker
                coils — all professionally tested and recovered.
              </p>

              {/* Value chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {[
                  { label: 'Camera Module', value: '₹400–₹1,200' },
                  { label: 'Housing Frame', value: '₹200–₹800' },
                  { label: 'Precious Metals', value: '₹100–₹350' },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="glass-card px-3 py-2 rounded-xl border border-emerald-500/20 flex items-center gap-2"
                  >
                    <Coins className="w-3.5 h-3.5 text-emerald-400" />
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block leading-tight">
                        {chip.label}
                      </span>
                      <span className="text-xs font-bold text-emerald-300">
                        {chip.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
