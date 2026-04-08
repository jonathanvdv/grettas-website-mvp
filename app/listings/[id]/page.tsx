import { Metadata } from 'next'
import { getListing } from '@/lib/listings'
import { ImageGallery } from '../_components/ImageGallery'
import { ListingDisclaimer } from '../_components/ListingDisclaimer'
import { ContactForm } from '@/components/ContactForm'
import { Bed, Bath, Maximize, Car, MapPin, ExternalLink, Home } from 'lucide-react'
import { MobileContactSheet } from '../_components/MobileContactSheet'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const unresolvedParams = await params
    const listing = await getListing(unresolvedParams.id)
    if (!listing) {
        return { title: 'Listing Not Found' }
    }
    return {
        title: `${listing.address.full} - $${listing.price.toLocaleString()}`,
        description: `${listing.beds} bed, ${listing.baths} bath home at ${listing.address.full}. Listed at $${listing.price.toLocaleString()}. Contact Gretta Hughes to book a showing.`,
    }
}

function DetailItem({ label, value }: { label: string; value: string | number | null | undefined }) {
    if (!value && value !== 0) return null
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{value}</p>
        </div>
    )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200">{title}</h2>
            {children}
        </section>
    )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-6 last:mb-0">
            <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h3>
            {children}
        </div>
    )
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const unresolvedParams = await params
    const listing = await getListing(unresolvedParams.id)

    if (!listing) {
        notFound()
    }

    const mapQuery = encodeURIComponent(listing.address.full)

    const hasBuilding = listing.constructionMaterial || listing.foundation || listing.roof || listing.exteriorFeatures
    const hasInterior = listing.flooring || listing.interiorFeatures || listing.appliances || listing.basement
    const hasUtilities = listing.heating || listing.cooling || listing.waterSource || listing.sewer
    const hasParking = listing.parkingTotal || listing.garageSpaces || listing.parkingFeatures
    const hasFinancial = listing.taxAmount || listing.associationFee
    const hasCommunity = listing.communityFeatures || listing.poolFeatures || listing.fencing

    return (
        <>
            <div className="bg-gray-50 relative min-h-screen pt-[72px] lg:pt-[84px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Address header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 pt-4 md:pt-6 pb-3 md:pb-4">
                        <h1 className="font-display text-lg sm:text-xl md:text-2xl text-gray-900 uppercase tracking-wide">
                            {listing.address.unitNumber ? `${listing.address.unitNumber} - ` : ''}
                            {listing.address.streetNumber} {listing.address.streetName}
                        </h1>
                        {listing.realtorCaUrl && (
                            <a
                                href={listing.realtorCaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-brand-accent hover:underline flex items-center gap-1 font-medium"
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> View on REALTOR.ca
                            </a>
                        )}
                    </div>

                    {/* Photo Grid */}
                    <ImageGallery photos={listing.photos} address={listing.address.full} />

                    {/* Price + Stats Bar */}
                    <div className="bg-white border border-gray-200 rounded-lg px-4 sm:px-6 py-4 sm:py-5 mt-4">
                        {/* Price */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-0">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                ${listing.price.toLocaleString()}
                                {listing.isRental && listing.rentFrequency && (
                                    <span className="text-sm sm:text-base font-normal text-gray-500 ml-1">
                                        /{listing.rentFrequency.toLowerCase()}
                                    </span>
                                )}
                            </span>
                            <span
                                className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase sm:hidden ${listing.status === 'Active' ? 'bg-green-100 text-green-700' : listing.status === 'Sold' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}
                            >
                                {listing.status}
                            </span>
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center gap-x-4 sm:gap-x-6 text-sm sm:text-base text-gray-600 pb-3 border-b border-gray-100 sm:border-0 sm:pb-0 sm:pt-2">
                            <span className="flex items-center gap-1.5 sm:gap-2">
                                <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <span className="font-semibold text-gray-900 sm:text-lg">{listing.beds}</span> Beds
                            </span>
                            <span className="flex items-center gap-1.5 sm:gap-2">
                                <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <span className="font-semibold text-gray-900 sm:text-lg">{listing.baths}</span> Baths
                            </span>
                            {listing.sqft && (
                                <span className="flex items-center gap-1.5 sm:gap-2">
                                    <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    <span className="font-semibold text-gray-900 sm:text-lg">
                                        {listing.sqft.toLocaleString()}
                                    </span>{' '}
                                    sqft
                                </span>
                            )}
                            {listing.parkingTotal != null && listing.parkingTotal > 0 && listing.parkingTotal <= 10 && (
                                <span className="hidden sm:flex items-center gap-2">
                                    <Car className="w-5 h-5 text-gray-400" />
                                    <span className="font-semibold text-gray-900 text-lg">{listing.parkingTotal}</span> Parking
                                </span>
                            )}
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-4 mt-3 sm:mt-2 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                {listing.address.city}, {listing.address.province}
                            </span>
                            <span>MLS® #{listing.mlsNumber}</span>
                            <span
                                className={`hidden sm:inline-block px-2.5 py-0.5 rounded text-xs font-semibold uppercase ${listing.status === 'Active' ? 'bg-green-100 text-green-700' : listing.status === 'Sold' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}
                            >
                                {listing.status}
                            </span>
                            {listing.parkingTotal != null && listing.parkingTotal > 0 && listing.parkingTotal <= 10 && (
                                <span className="flex sm:hidden items-center gap-1.5">
                                    <Car className="w-3.5 h-3.5 text-gray-400" />
                                    {listing.parkingTotal} Parking
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        {/* Left Column */}
                        <div className="w-full lg:w-2/3 space-y-6">
                            {/* Listing Description Card */}
                            {listing.description && (
                                <SectionCard title="Listing Description">
                                    <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
                                        {listing.description}
                                    </p>
                                </SectionCard>
                            )}

                            {/* Property Summary Card */}
                            <SectionCard title="Property Summary">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                                    <DetailItem label="Property Type" value={listing.propertyType} />
                                    <DetailItem label="Building Type" value={listing.buildingType} />
                                    <DetailItem label="Square Footage" value={listing.sqft ? `${listing.sqft.toLocaleString()} sqft` : null} />
                                    <DetailItem label="Lot Size" value={listing.lotSizeDimensions || listing.lotSize} />
                                    <DetailItem label="Storeys" value={listing.storeys} />
                                    <DetailItem label="Year Built" value={listing.yearBuilt} />
                                    <DetailItem label="Neighbourhood" value={listing.address.neighbourhood} />
                                    <DetailItem label="Zoning" value={listing.zoning} />
                                    {listing.taxAmount != null && (
                                        <DetailItem
                                            label={`Annual Property Taxes${listing.taxYear ? ` (${listing.taxYear})` : ''}`}
                                            value={`$${listing.taxAmount.toLocaleString()}`}
                                        />
                                    )}
                                    {hasParking && (
                                        <DetailItem label="Parking Type" value={listing.parkingFeatures || (listing.garageSpaces ? `${listing.garageSpaces} Garage` : null)} />
                                    )}
                                    {listing.parkingTotal != null && (
                                        <DetailItem label="Total Parking Spaces" value={listing.parkingTotal} />
                                    )}
                                    <DetailItem label="Time on Market" value={listing.daysOnMarket ? `${listing.daysOnMarket} days` : null} />
                                </div>
                            </SectionCard>

                            {/* Building Card */}
                            {(hasBuilding || hasInterior || hasUtilities || listing.beds) && (
                                <SectionCard title="Building">
                                    {/* Bedrooms */}
                                    <SubSection title="Bedrooms">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                            <DetailItem label="Total" value={listing.beds} />
                                            <DetailItem label="Above Grade" value={listing.bedsAboveGrade} />
                                            <DetailItem label="Below Grade" value={listing.bedsBelowGrade} />
                                        </div>
                                    </SubSection>

                                    {/* Bathrooms */}
                                    <SubSection title="Bathrooms">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                            <DetailItem label="Total" value={listing.baths} />
                                            <DetailItem label="Full" value={listing.bathsFull} />
                                            <DetailItem label="Partial" value={listing.bathsHalf} />
                                        </div>
                                    </SubSection>

                                    {/* Interior Features */}
                                    {hasInterior && (
                                        <SubSection title="Interior Features">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                                <DetailItem label="Appliances Included" value={listing.appliances} />
                                                <DetailItem label="Basement Type" value={listing.basement} />
                                                <DetailItem label="Flooring" value={listing.flooring} />
                                                <DetailItem label="Features" value={listing.interiorFeatures} />
                                            </div>
                                        </SubSection>
                                    )}

                                    {/* Building Features */}
                                    {hasBuilding && (
                                        <SubSection title="Building Features">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                                <DetailItem label="Construction" value={listing.constructionMaterial} />
                                                <DetailItem label="Foundation Type" value={listing.foundation} />
                                                <DetailItem label="Roof" value={listing.roof} />
                                                <DetailItem label="Exterior Finish" value={listing.exteriorFeatures} />
                                            </div>
                                        </SubSection>
                                    )}

                                    {/* Heating & Cooling */}
                                    {hasUtilities && (
                                        <SubSection title="Heating & Cooling">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                                <DetailItem label="Cooling" value={listing.cooling} />
                                                <DetailItem label="Heating Type" value={listing.heating} />
                                                <DetailItem label="Heating Fuel" value={listing.heatingFuel} />
                                            </div>
                                        </SubSection>
                                    )}
                                </SectionCard>
                            )}

                            {/* Measurements Card */}
                            {listing.sqft && (
                                <SectionCard title="Measurements">
                                    <DetailItem label="Square Footage" value={`${listing.sqft.toLocaleString()} sqft`} />
                                    {listing.lotSizeDimensions && (
                                        <div className="mt-4">
                                            <DetailItem label="Lot Dimensions" value={listing.lotSizeDimensions} />
                                        </div>
                                    )}
                                    {listing.lotSize && !listing.lotSizeDimensions && (
                                        <div className="mt-4">
                                            <DetailItem label="Lot Size" value={listing.lotSize} />
                                        </div>
                                    )}
                                </SectionCard>
                            )}

                            {/* Rooms Card */}
                            {listing.rooms.length > 0 && (
                                <SectionCard title="Rooms">
                                    <div className="overflow-x-auto -mx-2">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-gray-500 border-b border-gray-200">
                                                    <th className="pb-3 pl-2 font-medium">Level</th>
                                                    <th className="pb-3 font-medium">Room</th>
                                                    <th className="pb-3 font-medium">Dimensions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listing.rooms.map((room, i) => (
                                                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                                                        <td className="py-3 pl-2 text-gray-600">{room.level}</td>
                                                        <td className="py-3 text-gray-900 font-medium">{room.type}</td>
                                                        <td className="py-3 text-gray-600">{room.dimensions || 'Measurements not available'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </SectionCard>
                            )}

                            {/* Community & Neighbourhood Card */}
                            {(hasCommunity || hasFinancial) && (
                                <SectionCard title="Land">
                                    {hasCommunity && (
                                        <SubSection title="Neighbourhood Features">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                                <DetailItem label="Community Features" value={listing.communityFeatures} />
                                                <DetailItem label="Pool" value={listing.poolFeatures} />
                                                <DetailItem label="Fencing" value={listing.fencing} />
                                            </div>
                                        </SubSection>
                                    )}

                                    {hasFinancial && (
                                        <SubSection title="Maintenance or Condo Information">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                                {listing.associationFee != null && (
                                                    <DetailItem
                                                        label="Maintenance Fees"
                                                        value={`$${listing.associationFee.toLocaleString()}${listing.associationFeeFrequency ? ` ${listing.associationFeeFrequency}` : ''}`}
                                                    />
                                                )}
                                            </div>
                                        </SubSection>
                                    )}

                                    {hasParking && (
                                        <SubSection title="Parking">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                                                <DetailItem label="Parking Type" value={listing.parkingFeatures || 'No Garage'} />
                                                <DetailItem label="Total Parking Spaces" value={listing.parkingTotal} />
                                                <DetailItem label="Garage Spaces" value={listing.garageSpaces} />
                                            </div>
                                        </SubSection>
                                    )}
                                </SectionCard>
                            )}

                            {/* Brokerage Attribution */}
                            {listing.listingBrokerage && (
                                <p className="text-xs text-gray-400 px-2">Listed by {listing.listingBrokerage}</p>
                            )}

                            {/* Location Card */}
                            <SectionCard title="Location">
                                <div className="h-80 w-full relative rounded-lg overflow-hidden border border-gray-200">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                                    />
                                </div>
                            </SectionCard>
                        </div>

                        {/* Right Column - Sticky Contact (desktop only, mobile uses floating sheet) */}
                        <div className="hidden lg:block lg:w-1/3 shrink-0">
                            <div id="contact-section" className="sticky top-24 space-y-4">
                                {/* CTA Banner */}
                                <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-5 text-center">
                                    <Home className="w-8 h-8 text-brand-accent mx-auto mb-2" />
                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                        Interested in touring this property?
                                    </p>
                                    <p className="text-xs text-gray-500">Contact Gretta to schedule a private showing</p>
                                </div>

                                {/* Agent Card + Form */}
                                <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6">
                                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-200">
                                            <Image
                                                src="/images/gretta-headshot-2026.png"
                                                alt="Gretta Hughes"
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 leading-tight">
                                                Gretta Hughes
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-0.5">REALTOR® · RE/MAX Twin City</p>
                                            <a
                                                href="tel:519-590-3236"
                                                className="text-brand-accent text-sm font-semibold mt-1 block hover:underline"
                                            >
                                                (519) 590-3236
                                            </a>
                                        </div>
                                    </div>

                                    <ContactForm
                                        defaultMessage={`Hi Gretta, I'm interested in the property at ${listing.address.full} (MLS: ${listing.mlsNumber}). I'd like to book a showing or get more information.`}
                                        defaultIntent="Buy"
                                        listingAddress={listing.address.full}
                                        className="[&>div>label]:text-[10px]"
                                    />
                                </div>

                                {/* Virtual Tour Link */}
                                {listing.virtualTour && (
                                    <a
                                        href={listing.virtualTour}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center bg-gray-900 text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        View Virtual Tour
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <ListingDisclaimer lastUpdated={new Date().toLocaleDateString('en-CA')} />
                </div>
            </div>
            <MobileContactSheet
                defaultMessage={`Hi Gretta, I'm interested in the property at ${listing.address.full} (MLS: ${listing.mlsNumber}). I'd like to book a showing or get more information.`}
                listingAddress={listing.address.full}
            />
        </>
    )
}
