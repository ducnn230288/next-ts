import createMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { routing } from './core/lib/i18n/routing';
const publicPages = ['/auth/login'];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (!isPublicPage) {
    const token = (await cookies()).get('KEY_TOKEN');
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
