import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MapPin } from 'lucide-react'

export function NeighbourhoodGuide({ showHeader = true }: { showHeader?: boolean }) {
    const neighbourhoods = [
        {
            name: 'Hespeler',
            city: 'Cambridge',
            desc: 'Small-town charm with big upside. Growing fast, family-friendly, and still undervalued compared to KW. Smart buyers are moving here now.',
            tags: ['Families', 'Growth Area', 'Value'],
            link: '/listings',
        },
        {
            name: 'Preston',
            city: 'Cambridge',
            desc: "Riverside living, established streets, and a tight-knit community feel. One of Cambridge's most desirable pockets — listings move fast.",
            tags: ['Riverside', 'Established', 'Walkable'],
            link: '/listings',
        },
        {
            name: 'Galt',
            city: 'Cambridge',
            desc: "Historic architecture, the Grand River, and price points that still make sense. Galt is quietly becoming one of Ontario's best-kept secrets.",
            tags: ['Character Homes', 'Grand River', 'Opportunity'],
            link: '/listings',
        },
        {
            name: 'Downtown Kitchener',
            city: 'Kitchener',
            desc: 'The innovation district is booming. LRT access, new condo developments, and a vibrant food scene. Perfect for young professionals and investors.',
            tags: ['LRT Access', 'Investment', 'Urban'],
            link: '/listings',
        },
        {
            name: 'Uptown Waterloo',
            city: 'Waterloo',
            desc: 'Vibrant, walkable, and growing fast. Perfect for young professionals and investors. High demand means you need to act quickly.',
            tags: ['Walkable', 'LRT Access', 'Investment'],
            link: '/listings',
        },
        {
            name: 'Eagle Place',
            city: 'Brantford',
            desc: 'Affordable entry point with strong rental potential. Close to Laurier Brantford campus and the downtown core. A smart first investment.',
            tags: ['Affordable', 'Rental Potential', 'First-Time Buyers'],
            link: '/listings',
        },
    ]

    return (
        <section className={`${showHeader ? 'py-12 md:py-20' : 'py-8 md:py-12'} bg-white relative`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {showHeader && (
                    <AnimatedSection className="mb-16 md:mb-20 text-center">
                        <SectionLabel text="Explore the Region" />
                        <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                            Find Your <span className="italic text-brand-accent">Neighbourhood</span>
                        </h2>
                        <p className="text-brand-text-muted text-lg leading-relaxed font-light">
                            Every neighbourhood has a personality. Here are the areas Gretta knows inside and out. Search
                            listings in any of them.
                        </p>
                    </AnimatedSection>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {neighbourhoods.map((n, index) => (
                        <AnimatedSection key={index}>
                            <Link
                                href={n.link}
                                className="group block bg-brand-bg border border-brand-border hover:border-brand-accent/30 rounded-sm p-8 h-full transition-all duration-300 hover:shadow-lg relative"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-display text-2xl text-brand-text group-hover:text-brand-accent transition-colors">
                                            {n.name}
                                        </h3>
                                        <p className="text-xs uppercase tracking-widest text-brand-text-muted mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {n.city}
                                        </p>
                                    </div>
                                    <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity text-lg mt-1">
                                        →
                                    </span>
                                </div>

                                <p className="text-brand-text-muted text-sm leading-relaxed font-light mb-6">
                                    {n.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {n.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] uppercase tracking-wider font-semibold text-brand-accent/80 bg-brand-accent/5 border border-brand-accent/10 px-2.5 py-1 rounded-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection className="mt-12 text-center">
                    <Link
                        href="/listings"
                        className="inline-block border border-brand-border hover:border-brand-accent text-brand-text hover:text-brand-accent font-medium px-8 py-4 uppercase tracking-wider text-sm transition-colors"
                    >
                        Search All Listings →
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}
