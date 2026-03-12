import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutPreview() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <AnimatedSection className="relative aspect-[3/4] md:aspect-auto w-full order-2 md:order-1 flex items-center justify-center">
                        <div className="relative w-[280px] h-[370px] md:w-[320px] md:h-[420px] lg:w-[360px] lg:h-[470px]">
                            <Image
                                src="/images/chris3.png"
                                alt="Chris Pimentel - Real Estate Professional"
                                fill
                                className="object-contain object-center"
                                sizes="360px"
                            />
                        </div>
                    </AnimatedSection>

                    {/* Content Side */}
                    <AnimatedSection className="order-1 md:order-2">
                        <SectionLabel text="About Chris" />
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-text mb-8 leading-[1.1]">
                            16 Years In. <span className="italic">Still All In.</span>
                        </h2>

                        <div className="space-y-6 text-brand-text-muted text-base md:text-lg leading-relaxed font-light mb-10">
                            <p>
                                I&apos;ve been selling real estate in Cambridge and the Waterloo Region for 16 years.
                                That&apos;s not a talking point. It&apos;s 16 years of knowing which streets hold value,
                                which neighbourhoods are about to pop, and exactly what it takes to get a deal done in
                                this market.
                            </p>
                            <p>
                                I&apos;m deeply rooted in this community. Cambridge is home. I&apos;ve watched it grow,
                                helped families put down roots here, and built a reputation on straight talk and
                                results, not promises. I also speak Portuguese fluently, so if that&apos;s your first
                                language, we can work together in whatever way feels most comfortable.
                            </p>
                            <p>
                                Whether you&apos;re buying your first place or selling the home you raised your kids in,
                                I bring the same thing to the table every time: local expertise, honest advice, and the
                                drive to get you the best possible outcome. Ready to see what&apos;s out there? Start
                                with a search.
                            </p>
                        </div>

                        <Link
                            href="/about"
                            className="inline-block bg-brand-accent hover:bg-brand-accent-light text-white px-8 py-4 uppercase tracking-wider text-sm font-medium transition-colors"
                        >
                            Get to Know Chris &#8594;
                        </Link>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
