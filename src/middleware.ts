import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin subroutes (allow /admin itself for login)
  if (pathname.startsWith('/admin/') && pathname !== '/admin') {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== 'authenticated') {
      const loginUrl = new URL('/admin', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
