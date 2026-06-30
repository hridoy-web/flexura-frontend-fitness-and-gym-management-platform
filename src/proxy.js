
// import { NextResponse } from 'next/server';
// import { auth } from './lib/auth';

// export async function proxy(request) {

//  const session = await auth.api.getSession({
//     headers: request.headers
//   });

//   console.log('session');

//   const { pathname } = request.nextUrl;

//   // session check
//   if (!session) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   const userRole = session.user?.role; 

//   // admin dashboard protection
//   if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }

//   // trainer dashboard protection
//   if (pathname.startsWith('/dashboard/trainer') && userRole !== 'trainer') {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }

//   // user dashboard protection
//   if (pathname.startsWith('/dashboard/user') && userRole !== 'user') {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }

//   //  dashboard access based on role
//   if (pathname === '/dashboard' || pathname === '/dashboard/') {
//     if (userRole === 'admin') {
//       return NextResponse.redirect(new URL('/dashboard/admin', request.url));
//     }
//     if (userRole === 'trainer') {
//       return NextResponse.redirect(new URL('/dashboard/trainer', request.url));
//     }
//     return NextResponse.redirect(new URL('/dashboard/user', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/classes/:path', '/forum/:path', '/dashboard/:path*']
// }

import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const isPrefetch =
    request.headers.get('next-router-prefetch') === '1' ||
    request.headers.get('purpose') === 'prefetch';

  if (isPrefetch) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers
  });

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userRole = session.user?.role;

  if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/dashboard/trainer') && userRole !== 'trainer') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/dashboard/user') && userRole !== 'user') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    if (userRole === 'trainer') {
      return NextResponse.redirect(new URL('/dashboard/trainer', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/user', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/classes/:classPath*', '/forum/:forumPath*', '/dashboard/:dashboardPath*']
};