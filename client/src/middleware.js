import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const protectedRoutes = ['/onboarding'];
const guestRoutes = ['/login', '/signup', '/reset-password', '/forgot-password']

export async function middleware(request) {
    const session = await auth()
    const token = request.cookies.get('auth_token')?.value;
    const isAuth = Boolean(session) || Boolean(token)

    const pathname = request.nextUrl.pathname;


    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isGuestRoute = guestRoutes.some(route =>
        pathname.startsWith(route)
    )

    if ((isProtected && !isAuth) || (isGuestRoute && isAuth)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        ...protectedRoutes.map(route => `${route}/:path*`),
        ...guestRoutes
    ]
};
