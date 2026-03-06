'use client'

import { useState, useCallback, useMemo } from 'react'
import { ListingMap } from '@/components/listings/ListingMap'
import { ListingCard } from '@/components/listings/ListingCard'
import type { Listing } from '@/lib/listings'

interface MapViewProps {
    listings: Listing[]
}

/**
 * MapView Component
 * 
 * Provides a split-view interface with a scrollable list of properties on the left
 * and an interactive map on the right. Filtering occurs dynamically based on the 
 * map's current bounding box.
 */
export function MapView({ listings }: MapViewProps) {
    const [bounds, setBounds] = useState<{ north: number; south: number; east: number; west: number } | null>(null)

    const handleBoundsChange = useCallback((b: { north: number; south: number; east: number; west: number }) => {
        setBounds(b)
    }, [])

    const visibleListings = useMemo(() => {
        if (!bounds) return listings
        return listings.filter(l => {
            if (!l.latitude || !l.longitude) return true // show listings without coords
            return l.latitude >= bounds.south && l.latitude <= bounds.north &&
                l.longitude >= bounds.west && l.longitude <= bounds.east
        })
    }, [listings, bounds])

    return (
        <div className="flex gap-4 h-[calc(100vh-280px)] min-h-[500px]">
            {/* Sidebar - scrollable listing cards */}
            <div className="w-full lg:w-[40%] overflow-y-auto pr-2 space-y-4">
                {visibleListings.length > 0 ? (
                    visibleListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No listings in the current map area
                    </div>
                )}
            </div>

            {/* Map */}
            <div className="hidden lg:block lg:w-[60%] rounded-lg overflow-hidden border border-gray-200">
                <ListingMap listings={listings} onBoundsChange={handleBoundsChange} />
            </div>
        </div>
    )
}
