import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://api.mapbox.com https://cdn.mapbox.com",
        "style-src 'self' 'unsafe-inline' https://api.mapbox.com https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://cdn.realtor.ca https://*.realtor.ca https://www.realtor.ca https://api.mapbox.com https://cdn.mapbox.com",
        "connect-src 'self' https://api.mapbox.com https://*.mapbox.com https://events.mapbox.com https://ddfapi.realtor.ca",
        "worker-src 'self' blob:",
        "child-src 'self' blob: https://www.google.com",
        "frame-src https://www.google.com https://maps.google.com",
    ].join('; ')

    response.headers.set('Content-Security-Policy', csp)
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
}

export const config = {
    matcher: [
        // Match all routes except static files and Next.js internals
        '/((?!_next/static|_next/image|favicon.ico|images/).*)',
    ],
}
