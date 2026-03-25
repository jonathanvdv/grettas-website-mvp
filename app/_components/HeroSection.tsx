import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function HeroSection() {
    return (
        <section className="relative w-full bg-brand-bg overflow-hidden min-h-screen">
            {/* Subtle warm gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg-alt/30 to-brand-bg pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative">
                <div className="flex flex-col lg:flex-row items-center min-h-screen pt-24 lg:pt-0">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col z-10 lg:pr-12 pt-8 lg:pt-0">
                        <AnimatedSection>
                            {/* Thin decorative line */}
                            <div className="w-12 h-[1px] bg-brand-gold mb-8 animate-draw-line" />

                            <p className="text-brand-gold tracking-[0.2em] text-[9px] lg:text-[11px] font-medium uppercase mb-6 whitespace-nowrap">
                                Cambridge &middot; Kitchener &middot; Waterloo &middot; Guelph &middot; Brantford
                            </p>

                            <h1 className="font-display text-[2.8rem] leading-[1.02] sm:text-5xl lg:text-6xl 2xl:text-7xl text-brand-text mb-6 text-balance">
                                Thoughtful Real Estate,{' '}
                                <span className="italic text-brand-accent-light">Tailored to You.</span>
                            </h1>

                            <div className="text-brand-text-muted text-sm lg:text-base 2xl:text-lg leading-relaxed font-light text-pretty space-y-4 max-w-lg">
                                <p>
                                    I&apos;m Gretta Hughes, a Cambridge-based REALTOR&reg; with a genuine
                                    appreciation for the community I call home. I provide a thoughtful
                                    and tailored approach to real estate, guiding clients through each
                                    step with clarity, confidence, and care.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-10">
                                <Link
                                    href="/listings"
                                    className="bg-brand-text hover:bg-brand-text/85 text-white font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                                >
                                    Search Listings
                                </Link>
                                <Link
                                    href="/home-evaluation"
                                    className="border border-brand-border hover:border-brand-accent text-brand-text font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 duration-300"
                                >
                                    What&apos;s My Home Worth?
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 mt-10 text-[10px] text-brand-text-muted uppercase tracking-[0.15em]">
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    RE/MAX Twin City
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    100% Club &apos;21–&apos;24
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    English &amp; Espa&ntilde;ol
                                </span>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 flex items-end justify-center lg:justify-end self-end">
                        <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[3/4] lg:aspect-auto lg:h-[85vh]">
                            <Image
                                src="/images/gretta-hero.jpg"
                                alt="Gretta Hughes - Cambridge & Waterloo Region REALTOR"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover object-top"
                            />
                            {/* Soft gradient fade at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
