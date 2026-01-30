import CryptoJS from 'crypto-js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Authentication } from '~/architecture/domain/usecases';
import { CRYPTO_TOKEN, TOKEN_NAME } from '~/config/vars';

const PUBLIC_PATHS = ['/'];

const PROTECTED_IF_LOGGED_PATHS = [
  '/entrar',
  '/recuperar-senha',
  '/verifique-email',
  '/nova-senha',
  '/cadastro'
];

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const token = request.cookies.get(TOKEN_NAME)?.value;
  const pathname = request.nextUrl.pathname;

  requestHeaders.set('x-url', request.nextUrl.pathname);

  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isProtectedIfLogged = PROTECTED_IF_LOGGED_PATHS.includes(pathname);

  if (!token) {
    if (!isPublic && !isProtectedIfLogged) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  let payload: Authentication.Response | null = null;
  try {
    const bytes = CryptoJS.AES.decrypt(token, CRYPTO_TOKEN);
    payload = JSON.parse(
      bytes.toString(CryptoJS.enc.Utf8)
    ) as Authentication.Response;
  } catch (_err) {
    return NextResponse.redirect(new URL('/entrar', request.url));
  }

  const role = payload.user.type;

  if (isProtectedIfLogged) {
    const redirectPath = role === 'ORGANIZER' ? '/organizador' : '/atleta';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (pathname.startsWith('/organizador') && role !== 'ORGANIZER') {
    return NextResponse.redirect(new URL('/atleta', request.url));
  }

  if (pathname.startsWith('/atleta') && role !== 'ATHLETE') {
    return NextResponse.redirect(new URL('/organizador', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|static|favicon.ico|.*\\..*).*)']
};
