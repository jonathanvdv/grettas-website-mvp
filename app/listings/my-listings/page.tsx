import { Metadata } from 'next'
import { getFeaturedListings } from '@/lib/listings'
import { ListingDisclaimer } from '../_components/ListingDisclaimer'
import { MyListingsClient } from './MyListingsClient'

export const metadata: Metadata = {
    title: "Current Listings | Gretta Hughes REALTOR®",
    description:
        'Browse current listings by city. Gretta Hughes, REALTOR® with RE/MAX Twin City Realty in Cambridge.',
}

export default async function MyListingsPage() {
    const listings = await getFeaturedListings(50)

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <MyListingsClient listings={listings} />
                <ListingDisclaimer lastUpdated={new Date().toLocaleDateString('en-CA')} />
            </div>
        </div>
    )
}
