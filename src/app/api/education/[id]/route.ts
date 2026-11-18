import { NextRequest, NextResponse } from 'next/server';
import {
  updateEducationItem,
  deleteEducationItem,
} from '@/controllers/educationController';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = await updateEducationItem(id, body);
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Education entry not found' },
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
    await deleteEducationItem(id);
    return NextResponse.json({ success: true, message: 'Education entry deleted' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
