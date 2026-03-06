const DDF_TOKEN_URL = 'https://identity.crea.ca/connect/token'
const DDF_API_BASE = 'https://ddfapi.realtor.ca/odata/v1'
const DDF_CLIENT_ID = process.env.DDF_CLIENT_ID || ''
const DDF_CLIENT_SECRET = process.env.DDF_CLIENT_SECRET || ''

// ─── Token Cache ─────────────────────────────────────────────────────────
let cachedToken: string | null = null
let tokenExpiry = 0

async function getDdfToken(): Promise<string> {
    if (cachedToken && Date.now() < tokenExpiry) return cachedToken

    const res = await fetch(DDF_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: DDF_CLIENT_ID,
            client_secret: DDF_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: 'DDFApi_Read',
        }),
    })

    if (!res.ok) {
        console.error('DDF token error:', res.status, res.statusText)
        throw new Error('Failed to authenticate with CREA DDF')
    }

    const data = await res.json()
    cachedToken = data.access_token
    // Token lasts 60 min, refresh 5 min early
    tokenExpiry = Date.now() + (55 * 60 * 1000)
    return cachedToken!
}

// ─── Types ──────────────────────────────────────────────────────────────

export interface Room {
    type: string
    level: string
    dimensions: string
    description: string
}

export interface Listing {
    id: string
    mlsNumber: string
    address: {
        full: string
        streetNumber: string
        streetName: string
        unitNumber: string | null
        city: string
        province: string
        postalCode: string
        neighbourhood: string | null
    }
    price: number
    latitude: number | null
    longitude: number | null
    isRental: boolean
    rentPrice: number | null
    rentFrequency: string | null
    beds: number
    bedsAboveGrade: number | null
    bedsBelowGrade: number | null
    baths: number
    bathsFull: number | null
    bathsHalf: number | null
    sqft: number | null
    lotSize: string | null
    lotSizeDimensions: string | null
    propertyType: string
    buildingType: string | null
    storeys: string | null
    yearBuilt: number | null
    description: string
    photos: string[]
    listDate: string
    daysOnMarket: number
    status: 'Active' | 'Sold' | 'Pending'
    virtualTour: string | null
    // Building & structure
    constructionMaterial: string | null
    foundation: string | null
    roof: string | null
    exteriorFeatures: string | null
    // Interior
    flooring: string | null
    interiorFeatures: string | null
    appliances: string | null
    basement: string | null
    // Utilities
    heating: string | null
    heatingFuel: string | null
    cooling: string | null
    waterSource: string | null
    sewer: string | null
    // Parking
    parkingTotal: number | null
    garageSpaces: number | null
    parkingFeatures: string | null
    // Financial
    taxAmount: number | null
    taxYear: number | null
    associationFee: number | null
    associationFeeFrequency: string | null
    // Rooms
    rooms: Room[]
    roomsTotal: number | null
    // Misc
    zoning: string | null
    communityFeatures: string | null
    poolFeatures: string | null
    fencing: string | null
    // Required
    realtorCaUrl: string
    listingBrokerage: string
}

export interface ListingFilters {
    minPrice?: number
    maxPrice?: number
    beds?: number
    baths?: number
    propertyType?: string      // StructureType: House, Apartment, Row / Townhouse, etc.
    buildingType?: string       // PropertySubType: Single Family, Multi-family, etc.
    city?: string
    transactionType?: 'sale' | 'rent'
    storeys?: number
    yearBuilt?: number
    limit?: number
    offset?: number
    sortField?: 'listingPrice' | 'listingDate'
    sortDirection?: 'asc' | 'desc'
}

// ─── Build OData filter string ──────────────────────────────────────────

// StructureType values (Collection enum): House, Apartment, Row / Townhouse, Duplex, Triplex, etc.
// Land uses PropertySubType 'Vacant Land' since it has no StructureType

const SERVICE_AREA_CITIES = ['Kitchener', 'Waterloo', 'Cambridge', 'Guelph', 'Brampton', 'Mississauga', 'Toronto']

function buildODataFilter(filters: ListingFilters): string {
    const parts: string[] = []

    if (filters.minPrice) parts.push(`ListPrice ge ${filters.minPrice}`)
    if (filters.maxPrice) parts.push(`ListPrice le ${filters.maxPrice}`)
    if (filters.beds) parts.push(`BedroomsTotal ge ${filters.beds}`)
    if (filters.baths) parts.push(`BathroomsTotalInteger ge ${filters.baths}`)

    if (filters.propertyType) {
        if (filters.propertyType === 'Land') {
            parts.push(`PropertySubType eq 'Vacant Land'`)
        } else {
            parts.push(`StructureType/any(s: s eq '${filters.propertyType}')`)
        }
    }
    if (filters.buildingType) parts.push(`PropertySubType eq '${filters.buildingType}'`)
    if (filters.storeys) parts.push(`Stories ge ${filters.storeys}`)
    if (filters.yearBuilt) parts.push(`YearBuilt ge ${filters.yearBuilt}`)

    // Transaction type filter
    if (filters.transactionType === 'sale') {
        parts.push('ListPrice gt 0')
    } else if (filters.transactionType === 'rent') {
        parts.push('TotalActualRent gt 0')
    } else {
        parts.push('(ListPrice gt 0 or TotalActualRent gt 0)')
    }

    if (filters.city) {
        parts.push(`City eq '${filters.city}'`)
    } else {
        // Default to Abdul's service area
        const cityFilter = SERVICE_AREA_CITIES.map(c => `City eq '${c}'`).join(' or ')
        parts.push(`(${cityFilter})`)
    }

    return parts.join(' and ')
}

function buildODataOrderBy(filters: ListingFilters): string {
    const dir = filters.sortDirection || 'desc'
    if (filters.sortField === 'listingPrice') return `ListPrice ${dir}`
    return `OriginalEntryTimestamp ${dir}`
}

// ─── Fetch All Listings ──────────────────────────────────────────────────

/**
 * Fetches listings from the CREA DDF API or mock data source based on provided filters.
 * Supports pagination, sorting, and various property attribute filters.
 * 
 * @param filters - Criteria to filter and paginate results
 * @returns Object containing the listings array and the total count of matches
 */
export async function getListings(filters: ListingFilters = {}): Promise<{ listings: Listing[], totalCount: number }> {
    if (!DDF_CLIENT_ID) {
        console.warn('⚠️  No DDF_CLIENT_ID set - returning mock listings')
        const { mockListings } = await import('./mock-listings')
        const filtered = applyMockFilters(mockListings, filters)
        return { listings: filtered, totalCount: mockListings.length }
    }

    const token = await getDdfToken()
    const params = new URLSearchParams()
    params.set('$top', (filters.limit || 12).toString())
    if (filters.offset) params.set('$skip', filters.offset.toString())
    params.set('$count', 'true')

    const filter = buildODataFilter(filters)
    if (filter) params.set('$filter', filter)
    params.set('$orderby', buildODataOrderBy(filters))

    const url = `${DDF_API_BASE}/Property?${params.toString()}`
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
    })

    if (!res.ok) {
        const body = await res.text()
        console.error('DDF API error:', res.status, url, body)
        const { mockListings } = await import('./mock-listings')
        const filtered = applyMockFilters(mockListings, filters)
        return { listings: filtered, totalCount: mockListings.length }
    }

    const data = await res.json()
    const listings = (data.value || []).map(normalizeDdfListing)
    const totalCount = data['@odata.count'] ?? listings.length
    return { listings, totalCount }
}

// ─── Fetch Single Listing ────────────────────────────────────────────────

/**
 * Retrieves detailed information for a single listing by its unique ID.
 * 
 * @param listingId - The unique identifier (ListingKey) of the property
 * @returns The normalized listing object
 */
export async function getListing(listingId: string): Promise<Listing> {
    if (!DDF_CLIENT_ID) {
        const { mockListings } = await import('./mock-listings')
        const found = mockListings.find(l => l.id === listingId)
        if (!found) throw new Error('Listing not found')
        return found
    }

    const token = await getDdfToken()
    const params = new URLSearchParams()
    params.set('$filter', `ListingKey eq '${listingId}'`)
    params.set('$expand', 'Rooms')

    let res = await fetch(`${DDF_API_BASE}/Property?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
    })

    // If $expand=Rooms isn't supported, retry without it
    if (!res.ok) {
        params.delete('$expand')
        res = await fetch(`${DDF_API_BASE}/Property?${params.toString()}`, {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 300 },
        })
    }

    if (!res.ok) throw new Error(`Listing not found: ${listingId}`)

    const data = await res.json()
    if (!data.value || data.value.length === 0) throw new Error('Listing not found')
    return normalizeDdfListing(data.value[0])
}

// ─── Fetch Featured Listings ─────────────────────────────────────────────

/**
 * Fetches a list of featured listings, typically displayed on the home page.
 * Defaults to recent listings in Abdul's core service area.
 * 
 * @param limit - Maximum number of featured listings to return
 * @returns Array of featured listing objects
 */
export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
    if (!DDF_CLIENT_ID) {
        const { mockListings } = await import('./mock-listings')
        return mockListings.slice(0, limit)
    }

    // Get most recent active residential listings in Abdul's service area
    const token = await getDdfToken()
    const params = new URLSearchParams()
    params.set('$top', limit.toString())
    params.set('$filter', "(City eq 'Kitchener' or City eq 'Waterloo' or City eq 'Cambridge') and ListPrice gt 200000")
    params.set('$orderby', 'ModificationTimestamp desc')

    const res = await fetch(`${DDF_API_BASE}/Property?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
    })

    if (!res.ok) {
        console.error('DDF featured error:', res.status)
        return []
    }

    const data = await res.json()
    return (data.value || []).map(normalizeDdfListing)
}

// ─── Fetch Abdul's Own Listings ──────────────────────────────────────────

const ABDUL_AGENT_KEY = '2151491'

/**
 * Fetches listings specifically belonging to Abdul (the agent).
 * Uses the hardcoded agent key to filtered CREA DDF results.
 * 
 * @returns Array of listings where Abdul is the primary listing agent
 */
export async function getAgentListings(): Promise<Listing[]> {
    if (!DDF_CLIENT_ID) {
        const { mockListings } = await import('./mock-listings')
        return mockListings.slice(0, 6)
    }

    const token = await getDdfToken()
    const params = new URLSearchParams()
    params.set('$top', '50')
    params.set('$filter', `ListAgentKey eq '${ABDUL_AGENT_KEY}'`)
    params.set('$orderby', 'ModificationTimestamp desc')

    const res = await fetch(`${DDF_API_BASE}/Property?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
    })

    if (!res.ok) {
        console.error('DDF agent listings error:', res.status)
        return []
    }

    const data = await res.json()
    return (data.value || []).map(normalizeDdfListing)
}

// ─── Normalize DDF RESO response to our Listing type ─────────────────────

// Helper: coerce DDF value (string | array | null) to a display string
function ddfStr(val: any): string | null {
    if (!val) return null
    if (Array.isArray(val)) return val.join(', ')
    return String(val)
}

function normalizeDdfListing(raw: any): Listing {
    const streetNum = raw.StreetNumber || ''
    const streetName = raw.StreetName || ''
    const streetSuffix = raw.StreetSuffix || ''
    const unit = raw.UnitNumber || null
    const city = raw.City || ''
    const province = raw.StateOrProvince || 'ON'
    const postal = raw.PostalCode || ''

    const unitPart = unit ? ` Unit ${unit}` : ''
    const fullAddress = `${streetNum} ${streetName} ${streetSuffix}${unitPart}, ${city}, ${province} ${postal}`.trim()

    // Media array from DDF — filter to actual image URLs only
    const photos = (raw.Media || [])
        .filter((m: any) => m.MediaCategory === 'Photo' || (m.MediaURL && /\.(jpg|jpeg|png|webp|gif)/i.test(m.MediaURL)))
        .sort((a: any, b: any) => (a.Order || 0) - (b.Order || 0))
        .map((m: any) => m.MediaURL)
        .filter(Boolean)

    // Calculate days on market
    const listDate = raw.OriginalEntryTimestamp || ''
    const dom = listDate ? Math.floor((Date.now() - new Date(listDate).getTime()) / (1000 * 60 * 60 * 24)) : 0

    // Parse rooms from $expand=Rooms
    const rooms: Room[] = (raw.Rooms || []).map((r: any) => ({
        type: r.RoomType || 'Room',
        level: r.RoomLevel || '',
        dimensions: r.RoomDimensions || (r.RoomLength && r.RoomWidth ? `${r.RoomLength} x ${r.RoomWidth}` : ''),
        description: r.RoomDescription || '',
    }))

    return {
        id: raw.ListingKey,
        mlsNumber: raw.ListingId || raw.ListingKey,
        address: {
            full: fullAddress,
            streetNumber: streetNum,
            streetName: `${streetName} ${streetSuffix}`.trim(),
            unitNumber: unit,
            city,
            province,
            postalCode: postal,
            neighbourhood: raw.MLSAreaMinor || raw.SubdivisionName || null,
        },
        price: raw.ListPrice || raw.TotalActualRent || 0,
        latitude: raw.Latitude ?? null,
        longitude: raw.Longitude ?? null,
        isRental: !raw.ListPrice && !!raw.TotalActualRent,
        rentPrice: raw.TotalActualRent || null,
        rentFrequency: raw.LeaseAmountFrequency || null,
        beds: raw.BedroomsTotal || 0,
        bedsAboveGrade: raw.BedroomsAboveGrade ?? null,
        bedsBelowGrade: raw.BedroomsBelowGrade ?? null,
        baths: raw.BathroomsTotalInteger || 0,
        bathsFull: raw.BathroomsFull ?? null,
        bathsHalf: raw.BathroomsHalf ?? null,
        sqft: raw.LivingArea || raw.BuildingAreaTotal || null,
        lotSize: raw.LotSizeArea ? `${raw.LotSizeArea}` : null,
        lotSizeDimensions: raw.LotSizeDimensions || null,
        propertyType: (Array.isArray(raw.StructureType) && raw.StructureType[0]) || raw.PropertySubType || 'Residential',
        buildingType: raw.PropertySubType || null,
        storeys: ddfStr(raw.StoriesTotal || raw.Stories),
        yearBuilt: raw.YearBuilt || null,
        description: raw.PublicRemarks || '',
        photos,
        listDate,
        daysOnMarket: dom,
        status: normalizeStatus(raw.StandardStatus || raw.MlsStatus),
        virtualTour: raw.VirtualTourURLUnbranded || raw.VirtualTourURLBranded || null,
        // Building
        constructionMaterial: ddfStr(raw.ConstructionMaterials),
        foundation: ddfStr(raw.FoundationDetails || raw.Foundation),
        roof: ddfStr(raw.Roof),
        exteriorFeatures: ddfStr(raw.ExteriorFeatures),
        // Interior
        flooring: ddfStr(raw.Flooring),
        interiorFeatures: ddfStr(raw.InteriorFeatures),
        appliances: ddfStr(raw.Appliances),
        basement: ddfStr(raw.Basement),
        // Utilities
        heating: ddfStr(raw.Heating),
        heatingFuel: ddfStr(raw.HeatingFuel),
        cooling: ddfStr(raw.Cooling),
        waterSource: ddfStr(raw.WaterSource),
        sewer: ddfStr(raw.Sewer),
        // Parking
        parkingTotal: raw.ParkingTotal ?? raw.ParkingSpaces ?? null,
        garageSpaces: raw.GarageSpaces ?? null,
        parkingFeatures: ddfStr(raw.ParkingFeatures),
        // Financial
        taxAmount: raw.TaxAnnualAmount ?? null,
        taxYear: raw.TaxYear ?? null,
        associationFee: raw.AssociationFee ?? null,
        associationFeeFrequency: raw.AssociationFeeFrequency || null,
        // Rooms
        rooms,
        roomsTotal: raw.RoomsTotal ?? null,
        // Misc
        zoning: raw.Zoning || raw.ZoningDescription || null,
        communityFeatures: ddfStr(raw.CommunityFeatures),
        poolFeatures: ddfStr(raw.PoolFeatures),
        fencing: ddfStr(raw.Fencing),
        // Required
        realtorCaUrl: raw.ListingURL ? `https://${raw.ListingURL}` : `https://www.realtor.ca/real-estate/${raw.ListingKey}`,
        listingBrokerage: raw.ListOfficeName || '',
    }
}

function normalizeStatus(status: string): 'Active' | 'Sold' | 'Pending' {
    const s = (status || '').toLowerCase()
    if (s.includes('sold') || s.includes('closed')) return 'Sold'
    if (s.includes('pending') || s.includes('contingent')) return 'Pending'
    return 'Active'
}

// ─── Mock data filter helper ─────────────────────────────────────────────

function applyMockFilters(listings: Listing[], filters: ListingFilters): Listing[] {
    let result = [...listings]

    if (filters.minPrice) result = result.filter(l => l.price >= filters.minPrice!)
    if (filters.maxPrice) result = result.filter(l => l.price <= filters.maxPrice!)
    if (filters.beds) result = result.filter(l => l.beds >= filters.beds!)
    if (filters.baths) result = result.filter(l => l.baths >= filters.baths!)
    if (filters.city) result = result.filter(l => l.address.city === filters.city)

    return result.slice(0, filters.limit || 12)
}
