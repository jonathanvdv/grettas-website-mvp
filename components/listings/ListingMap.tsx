'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Listing } from '@/lib/listings'
import Link from 'next/link'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// KW region center
const DEFAULT_CENTER = { latitude: 43.45, longitude: -80.49 }
const DEFAULT_ZOOM = 10

interface ListingMapProps {
    listings: Listing[]
    onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void
}

function formatPrice(price: number): string {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `$${Math.round(price / 1000)}K`
    return `$${price.toLocaleString()}`
}

/**
 * ListingMap Component
 * 
 * An interactive map using Mapbox GL to display property listings as markers.
 * Supports clustering (future), popups for detail previews, and coordinate-based 
 * bounds changes for synchronizing with parent components.
 */
export function ListingMap({ listings, onBoundsChange }: ListingMapProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const mappableListings = useMemo(
        () => listings.filter(l => l.latitude && l.longitude),
        [listings]
    )

    const selectedListing = useMemo(
        () => mappableListings.find(l => l.id === selectedId) || null,
        [mappableListings, selectedId]
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMoveEnd = useCallback((evt: any) => {
        if (!onBoundsChange) return
        const bounds = evt.target.getBounds()
        onBoundsChange({
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
        })
    }, [onBoundsChange])

    if (!MAPBOX_TOKEN) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                Map requires NEXT_PUBLIC_MAPBOX_TOKEN
            </div>
        )
    }

    return (
        <Map
            initialViewState={{
                ...DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMoveEnd={handleMoveEnd}
            onLoad={(evt: any) => {
                // Fire initial bounds
                if (onBoundsChange) {
                    const bounds = evt.target.getBounds()
                    onBoundsChange({
                        north: bounds.getNorth(),
                        south: bounds.getSouth(),
                        east: bounds.getEast(),
                        west: bounds.getWest(),
                    })
                }
            }}
        >
            <NavigationControl position="top-right" />

            {mappableListings.map(listing => (
                <Marker
                    key={listing.id}
                    latitude={listing.latitude!}
                    longitude={listing.longitude!}
                    anchor="bottom"
                    onClick={(e: any) => {
                        e.originalEvent.stopPropagation()
                        setSelectedId(listing.id)
                    }}
                >
                    <div className="bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow cursor-pointer hover:scale-110 transition-transform whitespace-nowrap">
                        {formatPrice(listing.price)}
                    </div>
                </Marker>
            ))}

            {selectedListing && (
                <Popup
                    latitude={selectedListing.latitude!}
                    longitude={selectedListing.longitude!}
                    anchor="bottom"
                    offset={25}
                    onClose={() => setSelectedId(null)}
                    closeOnClick={false}
                >
                    <div className="p-1 max-w-[220px]">
                        {selectedListing.photos[0] && (
                            <img
                                src={selectedListing.photos[0]}
                                alt={selectedListing.address.full}
                                className="w-full h-24 object-cover rounded mb-2"
                            />
                        )}
                        <p className="font-bold text-sm">{formatPrice(selectedListing.price)}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{selectedListing.address.full}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {selectedListing.beds} bed · {selectedListing.baths} bath
                            {selectedListing.sqft ? ` · ${selectedListing.sqft} sqft` : ''}
                        </p>
                        <Link
                            href={`/listings/${selectedListing.id}`}
                            className="text-xs text-brand-accent font-medium mt-1.5 inline-block hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                </Popup>
            )}
        </Map>
    )
}
