import { NextRequest, NextResponse } from 'next/server'
import { getAllMapPins, parseFilterParams, type MapPin } from '@/lib/listings'

export const revalidate = 300

// In-memory cache keyed by filter string — survives across requests in the same process
const cache: Record<string, { pins: MapPin[]; totalCount: number; ts: number }> = {}
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export async function GET(request: NextRequest) {
    const sp = Object.fromEntries(request.nextUrl.searchParams.entries())
    const cacheKey = JSON.stringify(sp)

    // Return cached if fresh
    const cached = cache[cacheKey]
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
        return NextResponse.json({ pins: cached.pins, totalCount: cached.totalCount })
    }

    const filters = parseFilterParams(sp)
    const { pins, totalCount } = await getAllMapPins(filters)

    // Store in memory cache
    cache[cacheKey] = { pins, totalCount, ts: Date.now() }

    return NextResponse.json({ pins, totalCount })
}
