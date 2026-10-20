import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';

export async function GET() {
  try {
    const brands = db.getBrands();
    return NextResponse.json({ success: true, data: brands });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch brands' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }
    const brand = db.addBrand({
      name: body.name,
      slug: body.slug,
      active: body.active ?? true,
      logoUrl: body.logoUrl,
    });
    return NextResponse.json({ success: true, data: brand }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create brand' }, { status: 500 });
  }
}
