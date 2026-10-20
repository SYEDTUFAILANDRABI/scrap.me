import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';
import { RequestStatus } from '@/types';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Look up either by internal id or public referenceId
    const request = db.getRequestById(id) || db.getRequestByReference(id);

    if (!request) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: request });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to retrieve request' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Check if updating offer
    if (body.action === 'make_offer') {
      const offer = Number(body.offerPrice);
      if (isNaN(offer) || offer <= 0) {
        return NextResponse.json({ success: false, error: 'Valid offer price is required' }, { status: 400 });
      }
      const updated = db.updateRequestOffer(id, offer, body.reason || 'Physical inspection assessment');
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updated });
    }

    // Updating status
    if (body.status) {
      const updated = db.updateRequestStatus(
        id,
        body.status as RequestStatus,
        body.note || `Status updated to ${body.status}`,
        body.adminName || 'Admin'
      );
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ success: false, error: 'No valid action provided' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update request' }, { status: 500 });
  }
}
