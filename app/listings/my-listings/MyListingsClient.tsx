'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ListingCard } from '../_components/ListingCard'
import type { Listing } from '@/lib/listings'

export function MyListingsClient({ listings }: { listings: Listing[] }) {
    const [selectedCity, setSelectedCity] = useState('All')

    const cities = useMemo(() => {
        const citySet = new Set(listings.map((l) => l.address.city))
        return ['All', ...Array.from(citySet).sort()]
    }, [listings])

    const filtered = selectedCity === 'All'
        ? listings
        : listings.filter((l) => l.address.city === selectedCity)

    return (
        <>
            {/* Agent header */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-brand-accent/20">
                    <Image src="/images/gretta-headshot-2026.png" alt="Gretta Hughes" fill className="object-cover object-center" />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Current Listings</h1>
                    <p className="text-gray-500 mt-1">REALTOR® · RE/MAX Twin City Realty Inc., Brokerage</p>
                    <p className="text-sm text-gray-400 mt-1">
                        {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
                        {selectedCity !== 'All' && ` in ${selectedCity}`}
                    </p>
                </div>
                <a
                    href="tel:519-590-3236"
                    className="md:ml-auto bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                    Contact Gretta
                </a>
            </div>

            {/* City filter */}
            {cities.length > 2 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {cities.map((city) => (
                        <button
                            key={city}
                            onClick={() => setSelectedCity(city)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                                selectedCity === city
                                    ? 'bg-brand-text text-white border-brand-text'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-accent hover:text-brand-accent-light'
                            }`}
                        >
                            {city}
                            {city === 'All' && (
                                <span className="ml-1.5 text-xs opacity-70">({listings.length})</span>
                            )}
                            {city !== 'All' && (
                                <span className="ml-1.5 text-xs opacity-70">
                                    ({listings.filter((l) => l.address.city === city).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-gray-200 p-12 text-center rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings in {selectedCity}</h3>
                    <p className="text-gray-500 mb-6">
                        There are no active listings in {selectedCity} right now. Try another city or browse all listings.
                    </p>
                    <button
                        onClick={() => setSelectedCity('All')}
                        className="text-brand-accent font-medium hover:underline"
                    >
                        View all listings →
                    </button>
                </div>
            )}
        </>
    )
}
