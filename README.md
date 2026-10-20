# Reboot Scrap (scrap.me)

> **"Dead Phone. Real Value."**  
> A premium, full-stack smartphone buyback and e-waste recycling platform inspired by the simplicity of Scrap.me, featuring a distinctive glassmorphism design, non-linear valuation engine, live request tracking, and a comprehensive administration dashboard.

---

## 🌟 Overview

**Reboot Scrap** collects dead, damaged, cracked, liquid-damaged, and non-working smartphones and offers sellers fair, transparent, condition-based valuations. Rather than letting broken electronics clutter drawers or end up in landfills, Reboot Scrap diagnoses and salvages working sub-components (cameras, chassis, displays, haptic motors, precious metals) and responsibly aggregates hazardous materials.

---

## ✨ Key Features

### 1. 🎨 Premium Glassmorphism UI & Motion
- Deep midnight navy / charcoal backgrounds (`#070b12`) with emerald green (`#10b981`) and electric lime accents.
- Translucent frosted glass panels (`backdrop-filter: blur(16px)`), thin low-opacity borders (`border-white/10`), and layered ambient radial glows.
- Smooth **Framer Motion** transitions: interactive damaged-to-reclaimed phone visualizer, step wizard transitions, and collapsible accordions.

### 2. ⚡ Intelligent Valuation Engine
- Multi-factor non-linear condition deduction system preventing unrealistic negative calculations.
- Accounts for Brand, Model, Storage capacity (64 GB to 1 TB), Power state, Display panel integrity, Screen glass cracks, Liquid damage, Motherboard/IC health, and Account lock status.
- Guaranteed **minimum scrap floor valuation** based on recoverable camera sensors, casing, and precious metals.
- Automatic **"Manual Inspection Required"** fallback for complex multi-fault hardware.

### 3. 📱 5-Step Valuation Wizard (Homepage & `/sell`)
- **Step 1:** Select Smartphone Brand (Apple, Samsung, OnePlus, Xiaomi, Vivo, Oppo, Realme, Google Pixel, etc.)
- **Step 2:** Search & Filter Exact Phone Model
- **Step 3:** Select Internal Storage Capacity
- **Step 4:** Condition & Diagnostic Questionnaire (powers on, display blackout, cracked glass, water damage, motherboard fault, account lock)
- **Step 5:** Instant Indicative Price Range with transparent factor breakdown

### 4. 📝 Customer Pickup & Submission Workflow
- Clean customer submission form collecting full name, mobile number, city (Srinagar, Budgam, Baramulla, Anantnag, Pulwama, Sopore, Jammu), pickup preference, address, and preferred contact window.
- Optional damage photo upload with preview and removal.
- Unique Reference ID generator (e.g. `RS-2026-9A4B1`).
- Confirmation screen with celebratory confetti, request summary, physical inspection disclaimer, and one-click WhatsApp notification.

### 5. 🔍 Public Request Lifecycle Tracker (`/track`)
- Track submitted buyback requests using their unique reference code.
- Visual status pills for all 9 lifecycle states:
  1. `New Request`
  2. `Contacted`
  3. `Inspection Scheduled`
  4. `Device Inspected`
  5. `Final Offer Made`
  6. `Offer Accepted`
  7. `Pickup / Handover Pending`
  8. `Purchased & Paid`
  9. `Cancelled / Rejected`
- Complete timestamped activity and inspection audit trail.

### 6. 🛡️ Protected Admin Dashboard (`/admin`)
- Secure authentication screen (demo passcode: `admin`).
- Real-time KPI summary (Total requests, pending inspections, offers made, accepted offers, purchased & paid units, total cash payout).
- Searchable & filterable customer requests table.
- Detailed request inspector modal: customer contact info, device specs, diagnostic answers, uploaded photos, and direct WhatsApp customer messaging link.
- Final offer price adjustment with technician audit reasoning.
- Editable phone models & base valuation pricing manager.
- Configurable Kashmiri service areas and business settings.
- **One-click CSV export** of all customer requests.

### 7. ⚖️ Ethical Data Policy & Circular E-Waste
- Dedicated `/privacy` page detailing customer data security: factory reset guidance, Apple ID / Google account removal, and non-booting dead phone memory chip isolation.
- Transparent `/terms` defining indicative estimates vs. bench inspection agreements.
- In-depth `/how-it-works` guide detailing the anatomy of a dead smartphone and component recovery economics.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, custom glassmorphism utilities & CSS variables
- **Animations:** Framer Motion, Canvas Confetti
- **Icons:** Lucide React
- **Validation:** Zod schemas
- **Storage / Backend:** High-performance Next.js API route handlers with in-memory persistence and Supabase PostgreSQL schema readiness

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SYEDTUFAILANDRABI/scrap.me.git
cd scrap.me
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Access
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) and log in using the demo passcode:
```
admin
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard portal
│   │   ├── api/             # REST endpoints (brands, models, requests, settings, export)
│   │   ├── how-it-works/    # Behind the valuation engine & circular e-waste guide
│   │   ├── privacy/         # Responsible device data security policy
│   │   ├── sell/            # Dedicated multi-step sell & valuation page
│   │   ├── terms/           # Terms of valuation and physical inspection
│   │   ├── track/           # Public reference code lifecycle tracker
│   │   ├── globals.css      # Glassmorphism styling and ambient animations
│   │   ├── layout.tsx       # Root layout with SEO metadata & theme
│   │   ├── page.tsx         # Homepage with all sections
│   │   ├── robots.ts        # SEO robots configuration
│   │   └── sitemap.ts       # XML sitemap generator
│   ├── components/
│   │   ├── common/          # Navbar, Footer, AmbientGlow
│   │   ├── home/            # HeroSection, ValuationWidget, HowItWorks, WhyChooseUs, AcceptedDevices, TrustSustainability, Testimonials, FaqSection, FinalCta
│   │   └── sell/            # SellWizard component
│   ├── config/
│   │   └── brand.ts         # Central brand configuration, service areas & disclaimers
│   ├── lib/
│   │   ├── storage.ts       # In-memory database with pre-seeded models & requests
│   │   ├── utils.ts         # Formatting helpers (INR, reference codes, badges)
│   │   └── valuation-engine.ts # Non-linear condition deduction & pricing logic
│   └── types/
│       └── index.ts         # Comprehensive TypeScript interfaces
└── package.json
```

---

## 📄 License

This project is licensed under the MIT License.
