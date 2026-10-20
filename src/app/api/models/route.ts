import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get('brandId') || undefined;
    const all = searchParams.get('all') === 'true';

    const models = all ? db.getAllModels() : db.getModels(brandId);
    return NextResponse.json({ success: true, data: models });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch models' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.brandId || !body.baseValuation) {
      return NextResponse.json({ success: false, error: 'Missing required model fields' }, { status: 400 });
    }
    const model = db.addModel({
      brandId: body.brandId,
      name: body.name,
      supportedStorage: body.supportedStorage || ['64 GB', '128 GB', '256 GB'],
      baseValuation: Number(body.baseValuation),
      scrapFloorValuation: Number(body.scrapFloorValuation || Math.round(body.baseValuation * 0.1)),
      active: body.active ?? true,
    });
    return NextResponse.json({ success: true, data: model }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create model' }, { status: 500 });
  }
}
