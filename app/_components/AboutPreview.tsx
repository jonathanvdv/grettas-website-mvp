import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutPreview() {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <AnimatedSection className="relative order-2 md:order-1">
                        <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden">
                            <Image
                                src="/images/gretta-about.jpg"
                                alt="Gretta Hughes - Real Estate Professional"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                        {/* Decorative frame offset */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border border-brand-gold/20 -z-10 hidden md:block max-w-[500px] mx-auto" />
                    </AnimatedSection>

                    {/* Content Side */}
                    <AnimatedSection className="order-1 md:order-2">
                        <SectionLabel text="Meet Gretta" />
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-text mb-8 leading-[1.1]">
                            From New Beginnings{' '}
                            <span className="italic text-brand-accent-light">to Your New Home.</span>
                        </h2>

                        <div className="space-y-5 text-brand-text-muted text-base md:text-lg leading-relaxed font-light mb-10">
                            <p>
                                I was born in El Salvador and moved to Canada at the age of 10. Cambridge
                                has been home ever since. I know what it means to start over, to search for
                                a place that truly feels like yours. That experience drives everything I do
                                as a REALTOR&reg;.
                            </p>
                            <p>
                                Before real estate, I worked as an Early Childhood Educator and earned my
                                Child and Youth Worker diploma. Those years taught me patience, empathy, and
                                how to guide families through big life decisions. Buying or selling a home
                                is one of the biggest.
                            </p>
                        </div>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-3 text-brand-text font-medium text-sm uppercase tracking-[0.2em] group"
                        >
                            <span>Get to Know Gretta</span>
                            <span className="w-8 h-[1px] bg-brand-text group-hover:w-12 transition-all duration-300" />
                        </Link>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
