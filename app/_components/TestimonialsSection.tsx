import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            quote: "Gretta helped us find our dream home in Hespeler before it even hit the open market. Her knowledge of Cambridge is incredible — she knew which streets were appreciating and steered us to the perfect neighbourhood. We felt confident every step of the way.",
            author: 'Maria & Carlos D.',
            location: 'Cambridge',
        },
        {
            id: 2,
            quote: "We listed with Gretta and had multiple offers within the first week. She knew exactly how to price our Kitchener home and her staging advice was spot-on. The whole process was seamless — no surprises, no stress. We walked away with more than we expected.",
            author: 'Sarah & James T.',
            location: 'Kitchener',
        },
        {
            id: 3,
            quote: "As first-time buyers, we were completely overwhelmed. Gretta was so patient and thorough — she made everything feel manageable. She found us a place in Waterloo that we absolutely love. She answers her phone on weekends. That says everything.",
            author: 'Emily R.',
            location: 'Waterloo',
        },
    ]

    return (
        <section className="py-20 md:py-32 bg-brand-text text-white relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <p className="text-brand-gold tracking-[0.3em] text-xs font-medium uppercase mb-4">What Clients Say</p>
                    <h2 className="font-display text-4xl md:text-5xl text-white">
                        Real Stories from <span className="italic text-brand-gold">Real Families</span>
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <AnimatedSection key={t.id} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-8 md:p-10 flex flex-col relative group hover:bg-white/[0.07] transition-colors duration-500">
                            {/* Quote mark */}
                            <span className="text-brand-gold/20 font-display text-8xl absolute -top-4 left-6 select-none leading-none">
                                &ldquo;
                            </span>

                            <div className="flex gap-1 mb-6 mt-4 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-brand-gold"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <div className="flex-1 text-white/80 mb-8 relative z-10 leading-relaxed font-light">
                                <p>&ldquo;{t.quote}&rdquo;</p>
                            </div>

                            <div className="relative z-10">
                                <div className="w-8 h-[1px] bg-brand-gold/40 mb-4" />
                                <p className="text-white font-medium text-sm">{t.author}</p>
                                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-1">{t.location}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
