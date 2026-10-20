import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';

export async function GET() {
  try {
    const requests = db.getRequests();

    // Generate CSV Header
    const headers = [
      'Reference ID',
      'Created At',
      'Customer Name',
      'Customer Phone',
      'Customer Email',
      'City',
      'Pickup Method',
      'Pickup Address',
      'Brand',
      'Model',
      'Storage',
      'Powers On',
      'Display Working',
      'Screen Cracked',
      'Water Damaged',
      'Motherboard Damaged',
      'Status',
      'Estimated Min (INR)',
      'Estimated Max (INR)',
      'Admin Offer (INR)',
      'Admin Offer Reason',
    ];

    const rows = requests.map((r) => [
      `"${r.referenceId}"`,
      `"${new Date(r.createdAt).toISOString()}"`,
      `"${r.customerName.replace(/"/g, '""')}"`,
      `"${r.customerPhone}"`,
      `"${r.customerEmail || ''}"`,
      `"${r.city}"`,
      `"${r.pickupMethod}"`,
      `"${(r.pickupAddress || '').replace(/"/g, '""')}"`,
      `"${r.brandName}"`,
      `"${r.modelName}"`,
      `"${r.storage}"`,
      r.condition.powersOn ? 'YES' : 'NO',
      r.condition.displayWorking ? 'YES' : 'NO',
      r.condition.screenCracked ? 'YES' : 'NO',
      r.condition.waterDamaged ? 'YES' : 'NO',
      r.condition.motherboardSuspectedDamaged ? 'YES' : 'NO',
      `"${r.status}"`,
      r.estimatedMinPrice,
      r.estimatedMaxPrice,
      r.adminOfferPrice || '',
      `"${(r.adminOfferReason || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="reboot-scrap-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to generate CSV' }, { status: 500 });
  }
}
