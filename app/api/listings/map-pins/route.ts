import { NextRequest, NextResponse } from 'next/server'
import { getAllMapPins, type MapPin } from '@/lib/listings'

export const revalidate = 300

// Single in-memory cache for ALL pins — no filter key needed
let pinCache: { pins: MapPin[]; totalCount: number; ts: number } | null = null
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export async function GET(request: NextRequest) {
    try {
        // Always return the full unfiltered pin set — filtering happens client-side
        if (pinCache && Date.now() - pinCache.ts < CACHE_TTL) {
            return NextResponse.json({ pins: pinCache.pins, totalCount: pinCache.totalCount })
        }

        const { pins, totalCount } = await getAllMapPins()

        pinCache = { pins, totalCount, ts: Date.now() }

        return NextResponse.json({ pins, totalCount })
    } catch (error) {
        console.error('Error fetching map pins:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch map pins' },
            { status: 500 }
        )
    }
}
