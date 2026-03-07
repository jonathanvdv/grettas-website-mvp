'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { ListingMap, type MapBounds } from '@/components/listings/ListingMap'
import { MapPinCard } from '@/components/listings/MapPinCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { MapPin } from '@/lib/listings'

interface MapViewProps {
    filterParams: Record<string, string>
    totalCount: number
}

function buildQuery(params: Record<string, string>): string {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
        if (v) sp.set(k, v)
    }
    return sp.toString()
}

const PER_PAGE = 20

export function MapView({ filterParams, totalCount }: MapViewProps) {
    const [pins, setPins] = useState<MapPin[] | null>(null)
    const [bounds, setBounds] = useState<MapBounds | null>(null)
    const [page, setPage] = useState(0)
    const sidebarRef = useRef<HTMLDivElement>(null)

    // Fetch all pins on mount / filter change
    useEffect(() => {
        let cancelled = false
        setPins(null)

        fetch(`/api/listings/map-pins?${buildQuery(filterParams)}`)
            .then(r => r.json())
            .then(data => {
                if (!cancelled) setPins(data.pins)
            })
            .catch(() => {
                if (!cancelled) setPins([])
            })

        return () => { cancelled = true }
    }, [filterParams])

    // Debounced bounds change
    const boundsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const handleBoundsChange = useCallback((b: MapBounds) => {
        if (boundsTimerRef.current) clearTimeout(boundsTimerRef.current)
        boundsTimerRef.current = setTimeout(() => {
            setBounds(b)
            setPage(0) // reset to page 1 on pan/zoom
        }, 300)
    }, [])

    // Filter pins to visible bounds client-side
    const visiblePins = useMemo(() => {
        if (!pins || !bounds) return pins || []
        return pins.filter(p =>
            p.lat >= bounds.south && p.lat <= bounds.north &&
            p.lng >= bounds.west && p.lng <= bounds.east
        )
    }, [pins, bounds])

    const totalPages = Math.max(1, Math.ceil(visiblePins.length / PER_PAGE))
    const sidebarPins = useMemo(
        () => visiblePins.slice(page * PER_PAGE, (page + 1) * PER_PAGE),
        [visiblePins, page]
    )

    // Scroll sidebar to top on page change
    useEffect(() => {
        sidebarRef.current?.scrollTo({ top: 0 })
    }, [page])

    return (
        <div className="flex h-[calc(100vh-180px)] min-h-[500px]">
            {/* Sidebar — ~25% like realtor.ca */}
            <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 flex flex-col bg-white border-r border-gray-200">
                {/* Results header */}
                <div className="px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <p className="text-sm text-gray-600">
                        {pins === null ? (
                            <span className="text-gray-400">Loading...</span>
                        ) : (
                            <>
                                Results: <strong className="text-gray-900">{visiblePins.length.toLocaleString()} Listings</strong>
                            </>
                        )}
                    </p>
                </div>

                {/* Scrollable listing cards */}
                <div ref={sidebarRef} className="flex-1 overflow-y-auto">
                    {pins === null ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex gap-3 p-3 border-b border-gray-200 animate-pulse">
                                <div className="w-[140px] h-[100px] bg-gray-200 rounded flex-shrink-0" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : sidebarPins.length > 0 ? (
                        sidebarPins.map(pin => (
                            <MapPinCard key={pin.id} pin={pin} />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm p-4 text-center">
                            No listings in the current map area. Try zooming out or panning.
                        </div>
                    )}
                </div>

                {/* Pagination footer */}
                {pins && visiblePins.length > PER_PAGE && (
                    <div className="flex items-center justify-center gap-3 px-3 py-2.5 border-t border-gray-200 flex-shrink-0 bg-white">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-600">
                            {page + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page === totalPages - 1}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Map — fills remaining space */}
            <div className="hidden lg:block flex-1">
                {pins === null ? (
                    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 text-sm">
                        Loading map...
                    </div>
                ) : (
                    <ListingMap pins={pins} onBoundsChange={handleBoundsChange} />
                )}
            </div>
        </div>
    )
}
