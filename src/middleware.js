import { NextResponse } from 'next/server';

export async function middleware(request) {
  const sessionToken = request.cookies.get("better-auth.session_token");
  const { pathname } = request.nextUrl;

  if (pathname === '/classes' || pathname === '/forum') {
    return NextResponse.next();
  }

  const isProtectedPath = 
    pathname.startsWith('/classes/') || 
    pathname.startsWith('/forum/') || 
    pathname.startsWith('/dashboard');

  if (isProtectedPath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/classes/:path*', '/forum/:path*', '/dashboard/:path*'],
};