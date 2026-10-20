import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';
import { z } from 'zod';

const createRequestSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  city: z.string().min(1, 'Please select your city'),
  pickupMethod: z.enum(['pickup', 'dropoff']),
  pickupAddress: z.string().optional(),
  preferredContactTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']),
  brandId: z.string().min(1),
  brandName: z.string().min(1),
  modelId: z.string().min(1),
  modelName: z.string().min(1),
  storage: z.string().min(1),
  condition: z.object({
    powersOn: z.boolean(),
    displayWorking: z.boolean(),
    screenCracked: z.boolean(),
    chargesNormally: z.boolean(),
    batteryFunctional: z.boolean(),
    waterDamaged: z.boolean(),
    motherboardSuspectedDamaged: z.boolean(),
    lockedOrAccountTied: z.boolean(),
    physicallyIntact: z.boolean(),
    bodyCondition: z.enum(['good', 'minor_scratches', 'heavy_scratches', 'bent_cracked_back']),
  }),
  estimatedMinPrice: z.number().nonnegative(),
  estimatedMaxPrice: z.number().nonnegative(),
  customerNotes: z.string().optional(),
  photos: z.array(z.string()).default([]),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const requests = db.getRequests({ status, search });
    return NextResponse.json({ success: true, data: requests });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newRequest = db.createRequest({
      ...validated.data,
      customerEmail: validated.data.customerEmail || undefined,
      pickupAddress: validated.data.pickupAddress || undefined,
      customerNotes: validated.data.customerNotes || undefined,
      photos: validated.data.photos || [],
    });

    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
