import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
      });

      // Set cookie for 7 days
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value;
  return NextResponse.json({
    authenticated: session === 'authenticated',
  });
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.delete('admin_session');
  return response;
}
