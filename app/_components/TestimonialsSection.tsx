import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            quote: "Chris told us our first offer was too high, and he was right. We ended up getting the house in Hespeler for $40K less than we were about to bid. That's not just an agent, that's someone who actually has your back. Sixteen years of experience and you can feel it in every conversation.",
            author: 'Mark & Sandra L., Cambridge',
            stars: 5,
        },
        {
            id: 2,
            quote: 'We listed with Chris on a Thursday and had three offers by Monday. He knew exactly how to price our Kitchener home and his staging advice was spot-on. The whole process was seamless, no surprises, no stress. We walked away with more than we expected.',
            author: 'David & Priya R., Kitchener',
            stars: 5,
        },
        {
            id: 3,
            quote: "As first-time buyers in Waterloo, we were overwhelmed. Chris cut through the noise, showed us exactly what we could afford, and found us a place near both universities that's already appreciated. He answers his phone on weekends. That says everything.",
            author: 'Jessica M., Waterloo',
            stars: 5,
        },
    ]

    return (
        <section className="py-12 md:py-20 bg-brand-bg-dark text-white relative border-y border-brand-border/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                    <SectionLabel text="What Clients Say" className="text-brand-gold" />
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                        Real Stories from <span className="italic text-brand-gold">Real Families</span>
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <AnimatedSection key={t.id} className="bg-brand-card p-8 md:p-10 flex flex-col relative">
                            {/* Large quote mark */}
                            <span className="text-brand-accent/20 font-display text-9xl absolute -top-8 left-4 select-none">
                                &ldquo;
                            </span>

                            <div className="flex gap-1 mb-6 mt-4 relative z-10">
                                {[...Array(t.stars)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-brand-gold"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <div className="flex-1 text-brand-text mb-8 relative z-10 leading-relaxed font-light text-lg">
                                <p>&ldquo;{t.quote}&rdquo;</p>
                            </div>

                            <p className="text-brand-text font-medium text-sm tracking-wider uppercase">- {t.author}</p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
