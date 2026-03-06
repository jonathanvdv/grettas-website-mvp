'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'

export function ListingSearch({ initialFilters = {} }: { initialFilters?: Record<string, string> }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [isOpen, setIsOpen] = useState(false)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(name, value)
            } else {
                params.delete(name)
            }
            return params.toString()
        },
        [searchParams]
    )

    const handleFilterChange = (name: string, value: string) => {
        router.push(pathname + '?' + createQueryString(name, value))
    }

    const handleClear = () => {
        router.push(pathname)
    }

    // Helper to parse current values from search params or initial
    const currentVal = (key: string) => searchParams.get(key) || initialFilters[key] || ''

    return (
        <div className="bg-white border border-brand-border/40 shadow-sm rounded-sm mb-12 relative z-30">
            {/* Mobile Toggle */}
            <div className="md:hidden flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-semibold text-brand-text flex items-center gap-2 uppercase tracking-wider text-xs">
                    <Filter className="w-4 h-4 text-brand-accent" /> Filters
                </span>
                {isOpen ? <X className="w-5 h-5 text-brand-text" /> : <ChevronDown className="w-5 h-5 text-brand-text" />}
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:block p-6 md:p-8 border-t border-brand-border/40 md:border-t-0`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                    {/* Property Type */}
                    <div>
                        <label className="block text-[10px] font-semibold text-brand-text-muted mb-2 uppercase tracking-wider">Property Type</label>
                        <select
                            value={currentVal('pt')}
                            onChange={(e) => handleFilterChange('pt', e.target.value)}
                            className="w-full border-b border-brand-border py-2 bg-transparent focus:outline-none focus:border-brand-accent transition-colors text-brand-text text-sm font-medium appearance-none rounded-none"
                        >
                            <option value="">All Types</option>
                            <option value="House">House</option>
                            <option value="Condo">Condo</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-[10px] font-semibold text-brand-text-muted mb-2 uppercase tracking-wider">Area</label>
                        <select
                            value={currentVal('city')}
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                            className="w-full border-b border-brand-border py-2 bg-transparent focus:outline-none focus:border-brand-accent transition-colors text-brand-text text-sm font-medium appearance-none rounded-none"
                        >
                            <option value="">All Areas</option>
                            <option value="Kitchener">Kitchener</option>
                            <option value="Waterloo">Waterloo</option>
                            <option value="Cambridge">Cambridge</option>
                            <option value="Guelph">Guelph</option>
                            <option value="Brampton">Brampton</option>
                            <option value="Mississauga">Mississauga</option>
                            <option value="Toronto">Toronto</option>
                        </select>
                    </div>

                    {/* Min Price */}
                    <div>
                        <label className="block text-[10px] font-semibold text-brand-text-muted mb-2 uppercase tracking-wider">Min Price</label>
                        <select
                            value={currentVal('lp')}
                            onChange={(e) => handleFilterChange('lp', e.target.value)}
                            className="w-full border-b border-brand-border py-2 bg-transparent focus:outline-none focus:border-brand-accent transition-colors text-brand-text text-sm font-medium appearance-none rounded-none"
                        >
                            <option value="">Any</option>
                            <option value="400000">$400,000</option>
                            <option value="500000">$500,000</option>
                            <option value="600000">$600,000</option>
                            <option value="700000">$700,000</option>
                            <option value="800000">$800,000</option>
                            <option value="1000000">$1,000,000+</option>
                        </select>
                    </div>

                    {/* Max Price */}
                    <div>
                        <label className="block text-[10px] font-semibold text-brand-text-muted mb-2 uppercase tracking-wider">Max Price</label>
                        <select
                            value={currentVal('hp')}
                            onChange={(e) => handleFilterChange('hp', e.target.value)}
                            className="w-full border-b border-brand-border py-2 bg-transparent focus:outline-none focus:border-brand-accent transition-colors text-brand-text text-sm font-medium appearance-none rounded-none"
                        >
                            <option value="">Any</option>
                            <option value="500000">$500,000</option>
                            <option value="600000">$600,000</option>
                            <option value="700000">$700,000</option>
                            <option value="800000">$800,000</option>
                            <option value="1000000">$1,000,000</option>
                            <option value="1500000">$1,500,000</option>
                            <option value="2000000">$2,000,000+</option>
                        </select>
                    </div>

                    {/* Beds */}
                    <div>
                        <label className="block text-[10px] font-semibold text-brand-text-muted mb-2 uppercase tracking-wider">Bedrooms</label>
                        <select
                            value={currentVal('bd')}
                            onChange={(e) => handleFilterChange('bd', e.target.value)}
                            className="w-full border-b border-brand-border py-2 bg-transparent focus:outline-none focus:border-brand-accent transition-colors text-brand-text text-sm font-medium appearance-none rounded-none"
                        >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider shrink-0">Sort By:</label>
                        <select
                            value={currentVal('sortField') || 'listingDate'}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === 'listingDate') {
                                    router.push(pathname + '?' + createQueryString('sortField', 'listingDate') + '&' + createQueryString('sortDirection', 'desc'))
                                } else if (val === 'price-asc') {
                                    router.push(pathname + '?' + createQueryString('sortField', 'listingPrice') + '&' + createQueryString('sortDirection', 'asc'))
                                } else if (val === 'price-desc') {
                                    router.push(pathname + '?' + createQueryString('sortField', 'listingPrice') + '&' + createQueryString('sortDirection', 'desc'))
                                }
                            }}
                            className="border-b border-brand-border py-1 bg-transparent focus:outline-none focus:border-brand-accent transition-colors text-brand-text text-sm font-medium pr-6 appearance-none rounded-none"
                        >
                            <option value="listingDate">Newest</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    <button
                        onClick={handleClear}
                        className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted hover:text-brand-accent transition-colors flex items-center gap-2"
                    >
                        <X className="w-3 h-3" /> Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    )
}
