import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square } from 'lucide-react'
import type { Listing } from '@/lib/listings'

export function ListingCard({ listing }: { listing: Listing }) {
    // Simple check for "new" listing (within 7 days)
    const isNew = (Date.now() - new Date(listing.listDate).getTime()) / (1000 * 3600 * 24) <= 7

    return (
        <Link href={`/listings/${listing.id}`} className="group block h-full">
            <article className="h-full flex flex-col bg-brand-card rounded-sm overflow-hidden border border-brand-border hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                {/* Photo Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-brand-bg-dark">
                    <Image
                        src={listing.photos[0] || '/images/listing-placeholder.jpg'}
                        alt={listing.address.full}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle green overlay on hover */}
                    <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-300 z-10"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 z-20">
                        {isNew && (
                            <span className="bg-brand-accent text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1 shadow-sm">
                                New
                            </span>
                        )}
                        {listing.status === 'Pending' && (
                            <span className="bg-brand-gold text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1 shadow-sm">
                                Pending
                            </span>
                        )}
                        {listing.status === 'Sold' && (
                            <span className="bg-red-800 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1 shadow-sm">
                                Sold
                            </span>
                        )}
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                        <span className="bg-white/95 text-brand-text-muted text-[10px] uppercase tracking-wider font-semibold px-2 py-1 shadow-sm">
                            {listing.propertyType}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <p className="text-2xl font-display font-medium text-brand-text mb-2">
                        ${listing.price.toLocaleString()}
                    </p>
                    <div className="flex-1">
                        <p className="text-brand-text-muted text-sm leading-relaxed line-clamp-2">
                            <span className="font-semibold text-brand-text block mb-0.5">
                                {listing.address.streetNumber} {listing.address.streetName}
                                {listing.address.unitNumber ? ` Unit ${listing.address.unitNumber}` : ''}
                            </span>
                            {listing.address.city}, {listing.address.province}
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-brand-text-muted border-t border-brand-border/60 pt-4 mt-4">
                        <span className="flex items-center gap-1.5" title={`${listing.beds} Bedrooms`}>
                            <Bed className="w-4 h-4 text-brand-accent" /> {listing.beds} <span className="sr-only sm:not-sr-only">Beds</span>
                        </span>
                        <span className="flex items-center gap-1.5" title={`${listing.baths} Bathrooms`}>
                            <Bath className="w-4 h-4 text-brand-accent" /> {listing.baths} <span className="sr-only sm:not-sr-only">Baths</span>
                        </span>
                        {listing.sqft && (
                            <span className="flex items-center gap-1.5 ml-auto" title={`${listing.sqft} Square Feet`}>
                                <Square className="w-4 h-4 text-brand-accent" /> {listing.sqft.toLocaleString()} <span className="sr-only md:not-sr-only">sqft</span>
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    )
}
