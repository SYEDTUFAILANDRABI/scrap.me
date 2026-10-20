import { BusinessSettings } from '@/types';

export const BRAND_CONFIG = {
  name: 'Reboot Scrap',
  legalName: 'Reboot Scrap Technologies',
  tagline: 'Dead Phone. Real Value.',
  altTagline: 'Your Old Phone Still Has Value.',
  heroHeadline: 'Your Dead Phone Deserves a Better Ending.',
  heroSubtitle:
    'Broken screen? Dead battery? Won’t turn on? Turn your old smartphone into real value with transparent pricing, responsible e-waste recovery, and a hassle-free selling process.',
  
  serviceAreas: [
    'Srinagar',
    'Budgam',
    'Baramulla',
    'Anantnag',
    'Pulwama',
    'Ganderbal',
    'Sopore',
    'Jammu',
  ],
  defaultCity: 'Srinagar',
  
  contact: {
    phone: '+91 94190 00000',
    whatsapp: '+91 94190 00000',
    email: 'hello@rebootscrap.com',
    address: 'Residency Road, Regal Chowk, Srinagar, Jammu & Kashmir 190001',
    operatingHours: 'Mon - Sat: 10:00 AM – 7:30 PM',
  },

  disclaimers: {
    valuation:
      'All calculated values are indicative demo estimates subject to physical hardware evaluation and parts recovery testing. Valuation does not constitute a binding legal offer until the device has been physically inspected.',
    dataSecurity:
      'We strongly recommend all customers back up their personal files and perform a factory reset before handing over their device. For dead phones that cannot boot, our technicians will discuss secure chip-level parts salvage or certified physical disposal options upon collection.',
    eWaste:
      'Components that cannot be salvaged are segregated and routed to government-authorized e-waste recycling partners adhering to state and central pollution control guidelines.',
  },

  socials: {
    whatsapp: 'https://wa.me/919419000000',
    instagram: 'https://instagram.com/rebootscrap',
    twitter: 'https://twitter.com/rebootscrap',
    linkedin: 'https://linkedin.com/company/rebootscrap',
  },
} as const;

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: BRAND_CONFIG.name,
  tagline: BRAND_CONFIG.tagline,
  contactPhone: BRAND_CONFIG.contact.phone,
  contactWhatsApp: BRAND_CONFIG.contact.whatsapp,
  contactEmail: BRAND_CONFIG.contact.email,
  officeAddress: BRAND_CONFIG.contact.address,
  primaryRegion: 'Kashmir, India',
  serviceAreas: [...BRAND_CONFIG.serviceAreas],
  demoMode: true,
  valuationNotice: BRAND_CONFIG.disclaimers.valuation,
  dataSecurityNotice: BRAND_CONFIG.disclaimers.dataSecurity,
};
