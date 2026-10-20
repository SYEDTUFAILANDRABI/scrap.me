import {
  PhoneBrand,
  PhoneModel,
  SellingRequest,
  BusinessSettings,
  ValuationRule,
  RequestStatus,
} from '@/types';
import { DEFAULT_BUSINESS_SETTINGS } from '@/config/brand';
import { generateReferenceId } from './utils';

// Initial Brands
export const INITIAL_BRANDS: PhoneBrand[] = [
  { id: 'b-apple', name: 'Apple', slug: 'apple', active: true, order: 1 },
  { id: 'b-samsung', name: 'Samsung', slug: 'samsung', active: true, order: 2 },
  { id: 'b-oneplus', name: 'OnePlus', slug: 'oneplus', active: true, order: 3 },
  { id: 'b-xiaomi', name: 'Xiaomi / Redmi', slug: 'xiaomi', active: true, order: 4 },
  { id: 'b-vivo', name: 'Vivo', slug: 'vivo', active: true, order: 5 },
  { id: 'b-oppo', name: 'Oppo', slug: 'oppo', active: true, order: 6 },
  { id: 'b-realme', name: 'Realme', slug: 'realme', active: true, order: 7 },
  { id: 'b-google', name: 'Google Pixel', slug: 'google-pixel', active: true, order: 8 },
  { id: 'b-other', name: 'Other Brand', slug: 'other', active: true, order: 9 },
];

// Initial Models with Base Pristine Price and Scrap Floor Price
export const INITIAL_MODELS: PhoneModel[] = [
  // Apple
  {
    id: 'm-iphone-15',
    brandId: 'b-apple',
    name: 'iPhone 15',
    supportedStorage: ['128 GB', '256 GB', '512 GB'],
    baseValuation: 38000,
    scrapFloorValuation: 4500,
    active: true,
  },
  {
    id: 'm-iphone-14',
    brandId: 'b-apple',
    name: 'iPhone 14',
    supportedStorage: ['128 GB', '256 GB', '512 GB'],
    baseValuation: 30000,
    scrapFloorValuation: 3500,
    active: true,
  },
  {
    id: 'm-iphone-13',
    brandId: 'b-apple',
    name: 'iPhone 13',
    supportedStorage: ['128 GB', '256 GB', '512 GB'],
    baseValuation: 24000,
    scrapFloorValuation: 2800,
    active: true,
  },
  {
    id: 'm-iphone-12',
    brandId: 'b-apple',
    name: 'iPhone 12',
    supportedStorage: ['64 GB', '128 GB', '256 GB'],
    baseValuation: 17500,
    scrapFloorValuation: 2200,
    active: true,
  },
  {
    id: 'm-iphone-11',
    brandId: 'b-apple',
    name: 'iPhone 11',
    supportedStorage: ['64 GB', '128 GB', '256 GB'],
    baseValuation: 12500,
    scrapFloorValuation: 1500,
    active: true,
  },
  {
    id: 'm-iphone-xr',
    brandId: 'b-apple',
    name: 'iPhone XR',
    supportedStorage: ['64 GB', '128 GB'],
    baseValuation: 9000,
    scrapFloorValuation: 1100,
    active: true,
  },

  // Samsung
  {
    id: 'm-samsung-s23',
    brandId: 'b-samsung',
    name: 'Galaxy S23',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 32000,
    scrapFloorValuation: 3800,
    active: true,
  },
  {
    id: 'm-samsung-s22',
    brandId: 'b-samsung',
    name: 'Galaxy S22',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 21000,
    scrapFloorValuation: 2600,
    active: true,
  },
  {
    id: 'm-samsung-s21',
    brandId: 'b-samsung',
    name: 'Galaxy S21',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 14000,
    scrapFloorValuation: 1800,
    active: true,
  },
  {
    id: 'm-samsung-note20',
    brandId: 'b-samsung',
    name: 'Galaxy Note 20 Ultra',
    supportedStorage: ['256 GB', '512 GB'],
    baseValuation: 18000,
    scrapFloorValuation: 2200,
    active: true,
  },
  {
    id: 'm-samsung-a54',
    brandId: 'b-samsung',
    name: 'Galaxy A54 5G',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 13000,
    scrapFloorValuation: 1200,
    active: true,
  },
  {
    id: 'm-samsung-m34',
    brandId: 'b-samsung',
    name: 'Galaxy M34',
    supportedStorage: ['128 GB'],
    baseValuation: 7500,
    scrapFloorValuation: 800,
    active: true,
  },

  // OnePlus
  {
    id: 'm-oneplus-11',
    brandId: 'b-oneplus',
    name: 'OnePlus 11 5G',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 26000,
    scrapFloorValuation: 3000,
    active: true,
  },
  {
    id: 'm-oneplus-10pro',
    brandId: 'b-oneplus',
    name: 'OnePlus 10 Pro',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 19000,
    scrapFloorValuation: 2200,
    active: true,
  },
  {
    id: 'm-oneplus-9',
    brandId: 'b-oneplus',
    name: 'OnePlus 9',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 12000,
    scrapFloorValuation: 1400,
    active: true,
  },
  {
    id: 'm-oneplus-nord-ce3',
    brandId: 'b-oneplus',
    name: 'OnePlus Nord CE 3',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 9500,
    scrapFloorValuation: 1000,
    active: true,
  },

  // Xiaomi / Redmi
  {
    id: 'm-xiaomi-13pro',
    brandId: 'b-xiaomi',
    name: 'Xiaomi 13 Pro',
    supportedStorage: ['256 GB'],
    baseValuation: 25000,
    scrapFloorValuation: 2800,
    active: true,
  },
  {
    id: 'm-redmi-note12pro',
    brandId: 'b-xiaomi',
    name: 'Redmi Note 12 Pro',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 9000,
    scrapFloorValuation: 950,
    active: true,
  },
  {
    id: 'm-redmi-note11',
    brandId: 'b-xiaomi',
    name: 'Redmi Note 11',
    supportedStorage: ['64 GB', '128 GB'],
    baseValuation: 6000,
    scrapFloorValuation: 700,
    active: true,
  },

  // Vivo
  {
    id: 'm-vivo-x90',
    brandId: 'b-vivo',
    name: 'Vivo X90 Pro',
    supportedStorage: ['256 GB'],
    baseValuation: 24000,
    scrapFloorValuation: 2600,
    active: true,
  },
  {
    id: 'm-vivo-v27pro',
    brandId: 'b-vivo',
    name: 'Vivo V27 Pro',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 13500,
    scrapFloorValuation: 1300,
    active: true,
  },

  // Oppo
  {
    id: 'm-oppo-reno10',
    brandId: 'b-oppo',
    name: 'Oppo Reno 10 Pro',
    supportedStorage: ['256 GB'],
    baseValuation: 16000,
    scrapFloorValuation: 1600,
    active: true,
  },

  // Realme
  {
    id: 'm-realme-11pro',
    brandId: 'b-realme',
    name: 'Realme 11 Pro+ 5G',
    supportedStorage: ['256 GB'],
    baseValuation: 12000,
    scrapFloorValuation: 1100,
    active: true,
  },

  // Google Pixel
  {
    id: 'm-pixel-8',
    brandId: 'b-google',
    name: 'Google Pixel 8',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 29000,
    scrapFloorValuation: 3200,
    active: true,
  },
  {
    id: 'm-pixel-7pro',
    brandId: 'b-google',
    name: 'Google Pixel 7 Pro',
    supportedStorage: ['128 GB', '256 GB'],
    baseValuation: 22000,
    scrapFloorValuation: 2500,
    active: true,
  },
  {
    id: 'm-pixel-6a',
    brandId: 'b-google',
    name: 'Google Pixel 6a',
    supportedStorage: ['128 GB'],
    baseValuation: 11000,
    scrapFloorValuation: 1200,
    active: true,
  },

  // Other / Generic
  {
    id: 'm-other-generic',
    brandId: 'b-other',
    name: 'Older / Other Smartphone Model',
    supportedStorage: ['64 GB', '128 GB', '256 GB'],
    baseValuation: 4500,
    scrapFloorValuation: 500,
    active: true,
  },
];

// Initial Valuation Rules for admin fine-tuning
export const INITIAL_RULES: ValuationRule[] = [
  {
    id: 'rule-power',
    name: 'Phone Does Not Power On',
    conditionKey: 'powersOn',
    expectedFaultValue: false,
    deductionPercent: 55,
    description: 'Applied when the unit has no LED, backlight, or boot activity',
    active: true,
  },
  {
    id: 'rule-display',
    name: 'Display Blackout or Lines',
    conditionKey: 'displayWorking',
    expectedFaultValue: false,
    deductionPercent: 35,
    description: 'Requires replacement display panel assembly',
    active: true,
  },
  {
    id: 'rule-crack',
    name: 'Screen Glass Cracked',
    conditionKey: 'screenCracked',
    expectedFaultValue: true,
    deductionPercent: 22,
    description: 'Display functions but outer glass layer is fractured',
    active: true,
  },
  {
    id: 'rule-water',
    name: 'Water or Liquid Damage',
    conditionKey: 'waterDamaged',
    expectedFaultValue: true,
    deductionPercent: 35,
    description: 'Risk of board corrosion requiring ultrasonic cleaning',
    active: true,
  },
  {
    id: 'rule-motherboard',
    name: 'Motherboard IC Fault',
    conditionKey: 'motherboardSuspectedDamaged',
    expectedFaultValue: true,
    deductionPercent: 50,
    description: 'Shorts on power management IC or CPU rail',
    active: true,
  },
  {
    id: 'rule-battery',
    name: 'Battery / Charging Fault',
    conditionKey: 'batteryFunctional',
    expectedFaultValue: false,
    deductionPercent: 15,
    description: 'Degraded health below 60% or non-responsive charging sub-board',
    active: true,
  },
];

// Pre-seeded realistic customer requests for immediate admin inspection & workflow testing
export const INITIAL_REQUESTS: SellingRequest[] = [
  {
    id: 'req-001',
    referenceId: 'RS-2026-9A4B1',
    customerName: 'Aamir Mir',
    customerPhone: '+91 97971 12345',
    customerEmail: 'aamir.mir@gmail.com',
    city: 'Srinagar',
    pickupMethod: 'pickup',
    pickupAddress: 'House 42, Rajbagh Near Park, Srinagar',
    preferredContactTime: 'afternoon',
    brandId: 'b-apple',
    brandName: 'Apple',
    modelId: 'm-iphone-12',
    modelName: 'iPhone 12',
    storage: '128 GB',
    condition: {
      powersOn: false,
      displayWorking: false,
      screenCracked: true,
      chargesNormally: false,
      batteryFunctional: false,
      waterDamaged: false,
      motherboardSuspectedDamaged: true,
      lockedOrAccountTied: false,
      physicallyIntact: true,
      bodyCondition: 'minor_scratches',
    },
    estimatedMinPrice: 2200,
    estimatedMaxPrice: 3100,
    adminOfferPrice: 2600,
    adminOfferReason: 'Verified dead motherboard, but camera modules and OEM aluminum frame in mint condition.',
    status: 'final_offer_made',
    customerNotes: 'Dropped it down stairs last month. Won’t turn on or vibrate when plugged in.',
    photos: [],
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    auditLog: [
      {
        status: 'new',
        note: 'Customer submitted dead phone valuation request online.',
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      },
      {
        status: 'contacted',
        note: 'Called customer to confirm pickup location at Rajbagh.',
        timestamp: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
        adminName: 'Suhail (Agent)',
      },
      {
        status: 'inspected',
        note: 'Technician bench tested device. Confirmed dead PMIC on motherboard.',
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        adminName: 'Zubair (Tech Lead)',
      },
      {
        status: 'final_offer_made',
        note: 'Offered ₹2,600 based on frame & camera salvage value.',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        adminName: 'Admin',
      },
    ],
  },
  {
    id: 'req-002',
    referenceId: 'RS-2026-3C7E8',
    customerName: 'Zehra Qureshi',
    customerPhone: '+91 99065 67890',
    customerEmail: 'zehra.q@yahoo.com',
    city: 'Budgam',
    pickupMethod: 'pickup',
    pickupAddress: 'Main Market, Ompora, Budgam',
    preferredContactTime: 'morning',
    brandId: 'b-samsung',
    brandName: 'Samsung',
    modelId: 'm-samsung-s22',
    modelName: 'Galaxy S22',
    storage: '256 GB',
    condition: {
      powersOn: true,
      displayWorking: false,
      screenCracked: true,
      chargesNormally: true,
      batteryFunctional: true,
      waterDamaged: false,
      motherboardSuspectedDamaged: false,
      lockedOrAccountTied: false,
      physicallyIntact: true,
      bodyCondition: 'minor_scratches',
    },
    estimatedMinPrice: 6500,
    estimatedMaxPrice: 8200,
    status: 'inspection_scheduled',
    customerNotes: 'Phone rings and vibrates when called, but display is completely black with glass cracked.',
    photos: [],
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    auditLog: [
      {
        status: 'new',
        note: 'Online request submitted.',
        timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      },
      {
        status: 'contacted',
        note: 'Customer agreed to doorstep inspection on Wednesday morning.',
        timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        adminName: 'Suhail',
      },
    ],
  },
  {
    id: 'req-003',
    referenceId: 'RS-2026-8D2F4',
    customerName: 'Faizan Bhat',
    customerPhone: '+91 94191 88990',
    city: 'Baramulla',
    pickupMethod: 'dropoff',
    preferredContactTime: 'evening',
    brandId: 'b-oneplus',
    brandName: 'OnePlus',
    modelId: 'm-oneplus-9',
    modelName: 'OnePlus 9',
    storage: '128 GB',
    condition: {
      powersOn: false,
      displayWorking: false,
      screenCracked: false,
      chargesNormally: false,
      batteryFunctional: false,
      waterDamaged: true,
      motherboardSuspectedDamaged: true,
      lockedOrAccountTied: false,
      physicallyIntact: true,
      bodyCondition: 'good',
    },
    estimatedMinPrice: 1400,
    estimatedMaxPrice: 1900,
    adminOfferPrice: 1600,
    status: 'purchased',
    customerNotes: 'Slipped into water while trekking. Left in rice for a week but never revived.',
    photos: [],
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    auditLog: [
      {
        status: 'new',
        note: 'Online request created.',
        timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      },
      {
        status: 'purchased',
        note: 'Device handed over at collection point. Payment of ₹1,600 made via UPI.',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        adminName: 'Admin',
      },
    ],
  },
];

// Global In-Memory Singleton Store across API routes in Next.js
declare global {
  // eslint-disable-next-line no-var
  var __reboot_scrap_db:
    | {
        brands: PhoneBrand[];
        models: PhoneModel[];
        rules: ValuationRule[];
        requests: SellingRequest[];
        settings: BusinessSettings;
      }
    | undefined;
}

function getDatabase() {
  if (!global.__reboot_scrap_db) {
    global.__reboot_scrap_db = {
      brands: [...INITIAL_BRANDS],
      models: [...INITIAL_MODELS],
      rules: [...INITIAL_RULES],
      requests: [...INITIAL_REQUESTS],
      settings: { ...DEFAULT_BUSINESS_SETTINGS },
    };
  }
  return global.__reboot_scrap_db;
}

export const db = {
  // Brands
  getBrands: () => getDatabase().brands.filter((b) => b.active),
  getAllBrands: () => getDatabase().brands,
  getBrandById: (id: string) => getDatabase().brands.find((b) => b.id === id),
  addBrand: (brand: Omit<PhoneBrand, 'id' | 'order'>) => {
    const newBrand: PhoneBrand = {
      ...brand,
      id: `b-${Date.now()}`,
      order: getDatabase().brands.length + 1,
    };
    getDatabase().brands.push(newBrand);
    return newBrand;
  },

  // Models
  getModels: (brandId?: string) => {
    const list = getDatabase().models.filter((m) => m.active);
    if (brandId) return list.filter((m) => m.brandId === brandId);
    return list;
  },
  getAllModels: () => getDatabase().models,
  getModelById: (id: string) => getDatabase().models.find((m) => m.id === id),
  addModel: (model: Omit<PhoneModel, 'id'>) => {
    const newModel: PhoneModel = {
      ...model,
      id: `m-${Date.now()}`,
    };
    getDatabase().models.push(newModel);
    return newModel;
  },
  updateModel: (id: string, updates: Partial<PhoneModel>) => {
    const model = getDatabase().models.find((m) => m.id === id);
    if (!model) return null;
    Object.assign(model, updates);
    return model;
  },

  // Requests
  getRequests: (filter?: { status?: string; search?: string }) => {
    let list = [...getDatabase().requests];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((r) => r.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.referenceId.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.customerPhone.toLowerCase().includes(q) ||
          r.modelName.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q)
      );
    }
    return list.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getRequestById: (id: string) => getDatabase().requests.find((r) => r.id === id),
  getRequestByReference: (ref: string) =>
    getDatabase().requests.find(
      (r) => r.referenceId.trim().toLowerCase() === ref.trim().toLowerCase()
    ),
  createRequest: (
    data: Omit<SellingRequest, 'id' | 'referenceId' | 'status' | 'createdAt' | 'updatedAt' | 'auditLog'>
  ) => {
    const ref = generateReferenceId();
    const now = new Date().toISOString();
    const newRequest: SellingRequest = {
      ...data,
      id: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      referenceId: ref,
      status: 'new',
      createdAt: now,
      updatedAt: now,
      auditLog: [
        {
          status: 'new',
          note: 'Customer submitted selling request online via valuation portal.',
          timestamp: now,
        },
      ],
    };
    getDatabase().requests.unshift(newRequest);
    return newRequest;
  },
  updateRequestStatus: (
    id: string,
    status: RequestStatus,
    note: string,
    adminName = 'Admin'
  ) => {
    const req = getDatabase().requests.find((r) => r.id === id);
    if (!req) return null;
    const now = new Date().toISOString();
    req.status = status;
    req.updatedAt = now;
    req.auditLog.push({
      status,
      note,
      timestamp: now,
      adminName,
    });
    return req;
  },
  updateRequestOffer: (id: string, offerPrice: number, reason: string) => {
    const req = getDatabase().requests.find((r) => r.id === id);
    if (!req) return null;
    const now = new Date().toISOString();
    req.adminOfferPrice = offerPrice;
    req.adminOfferReason = reason;
    req.status = 'final_offer_made';
    req.updatedAt = now;
    req.auditLog.push({
      status: 'final_offer_made',
      note: `Admin set final offer price to ₹${offerPrice.toLocaleString('en-IN')}. Reason: ${reason}`,
      timestamp: now,
      adminName: 'Admin',
    });
    return req;
  },

  // Settings
  getSettings: () => getDatabase().settings,
  updateSettings: (updates: Partial<BusinessSettings>) => {
    Object.assign(getDatabase().settings, updates);
    return getDatabase().settings;
  },

  // Rules
  getRules: () => getDatabase().rules,
  updateRule: (id: string, updates: Partial<ValuationRule>) => {
    const rule = getDatabase().rules.find((r) => r.id === id);
    if (!rule) return null;
    Object.assign(rule, updates);
    return rule;
  },
};
