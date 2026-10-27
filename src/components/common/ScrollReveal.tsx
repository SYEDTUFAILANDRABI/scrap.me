'use client';

import React, { useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from 'framer-motion';

export type RevealEffect =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'blur-in'
  | 'slide-rotate'
  | 'tilt-in'
  | 'pop-spring'
  | 'glow-reveal'
  | 'clip-reveal'
  | 'diagonal-left'
  | 'diagonal-right';

interface ScrollRevealProps {
  children: React.ReactNode;
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const effectVariants: Record<RevealEffect, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -50, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 60, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.82, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  'zoom-out': {
    hidden: { opacity: 0, scale: 1.18, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  'flip-up': {
    hidden: { opacity: 0, rotateX: 25, y: 50, transformPerspective: 1000 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1000 },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(24px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  'slide-rotate': {
    hidden: { opacity: 0, x: -50, rotate: -4, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' },
  },
  'tilt-in': {
    hidden: {
      opacity: 0,
      rotateX: 20,
      rotateY: -12,
      scale: 0.9,
      y: 40,
      transformPerspective: 1200,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      transformPerspective: 1200,
      filter: 'blur(0px)',
    },
  },
  'pop-spring': {
    hidden: { opacity: 0, scale: 0.65, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18,
      },
    },
  },
  'glow-reveal': {
    hidden: {
      opacity: 0,
      y: 35,
      filter: 'drop-shadow(0 0 0 rgba(16,185,129,0)) blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'drop-shadow(0 0 25px rgba(16,185,129,0.25)) blur(0px)',
    },
  },
  'clip-reveal': {
    hidden: {
      opacity: 0,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: 30,
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      y: 0,
    },
  },
  'diagonal-left': {
    hidden: { opacity: 0, x: -50, y: 50, rotate: -3, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' },
  },
  'diagonal-right': {
    hidden: { opacity: 0, x: 50, y: 50, rotate: 3, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' },
  },
};

export function ScrollReveal({
  children,
  effect = 'fade-up',
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const variants = effectVariants[effect];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered Children Reveal ────────────────────────── */
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  itemEffect?: 'fade-up' | 'pop' | 'slide-left' | 'tilt';
}

const staggerItemVariants: Record<string, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 35, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.75 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 16 },
    },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  },
  tilt: {
    hidden: { opacity: 0, rotateX: 18, y: 30, transformPerspective: 900 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transformPerspective: 900,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export function StaggerReveal({
  children,
  className = '',
  stagger = 0.1,
  once = true,
  itemEffect = 'fade-up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const selectedVariant = staggerItemVariants[itemEffect] || staggerItemVariants['fade-up'];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={selectedVariant}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

/* ── Parallax Scroll Container ────────────────────────── */
interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number; // e.g. -40 moves up slower, 40 moves up faster
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 30,
  className = '',
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ── Scroll Progress Bar for Top of Viewport ─────────── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 z-50 origin-left shadow-[0_0_12px_rgba(16,185,129,0.8)] pointer-events-none"
    />
  );
}

/* ── Scroll Scale Effect (gently expands in center) ──── */
interface ScrollScaleProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollScale({ children, className = '' }: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.6, 1, 1, 0.7]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity }}>{children}</motion.div>
    </div>
  );
}
