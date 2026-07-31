import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const path = request.nextUrl.pathname;


  if (path.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded: any = jwtDecode(token);

      if (path.startsWith('/dashboard/admin') && decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }


      if (path.startsWith('/dashboard/technician') && decoded.role !== 'TECHNICIAN') {
        return NextResponse.redirect(new URL('/', request.url));
      }


      if (path.startsWith('/dashboard/customer') && decoded.role !== 'CUSTOMER') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {

      return NextResponse.redirect(new URL('/login', request.url));
    }
  }


  if (token && (path === '/login' || path === '/register')) {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role === 'ADMIN' || decoded.role === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      } else if (decoded.role === 'TECHNICIAN') {
        return NextResponse.redirect(new URL('/dashboard/technician', request.url));
      } else {
        return NextResponse.redirect(new URL('/dashboard/customer', request.url));
      }
    } catch (error) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
