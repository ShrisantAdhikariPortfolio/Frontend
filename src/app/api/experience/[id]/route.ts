import { NextRequest, NextResponse } from 'next/server';
import {
  updateExperience,
  deleteExperience,
} from '@/controllers/experienceController';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = await updateExperience(id, body);
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteExperience(id);
    return NextResponse.json({ success: true, message: 'Experience deleted' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
