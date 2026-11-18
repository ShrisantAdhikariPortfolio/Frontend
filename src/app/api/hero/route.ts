import { NextRequest, NextResponse } from 'next/server';
import { getHero, updateHero } from '@/controllers/heroController';

export async function GET() {
  try {
    const data = await getHero();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await updateHero(body);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
