import { NextRequest, NextResponse } from 'next/server'
import { getAllMapPins, type MapPin } from '@/lib/listings'

export const revalidate = 300

// Single in-memory cache for ALL pins
let pinCache: { pins: MapPin[]; totalCount: number; ts: number } | null = null
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

const DEFAULT_PAGE_SIZE = 500

async function ensureCache(): Promise<{ pins: MapPin[]; totalCount: number }> {
    if (pinCache && Date.now() - pinCache.ts < CACHE_TTL) {
        return pinCache
    }
    const { pins, totalCount } = await getAllMapPins()
    pinCache = { pins, totalCount, ts: Date.now() }
    return pinCache
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl
        const cursor = Math.max(0, Number(searchParams.get('cursor')) || 0)
        const limit = Math.min(1000, Math.max(1, Number(searchParams.get('limit')) || DEFAULT_PAGE_SIZE))

        const { pins, totalCount } = await ensureCache()

        const slice = pins.slice(cursor, cursor + limit)
        const nextCursor = cursor + limit < pins.length ? cursor + limit : null

        return NextResponse.json({
            pins: slice,
            totalCount,
            nextCursor,
        })
    } catch (error) {
        console.error('Error fetching map pins:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch map pins' },
            { status: 500 }
        )
    }
}
