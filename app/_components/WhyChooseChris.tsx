import { MapPin, Clock, ShieldCheck, TrendingUp, User, Home } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function WhyChooseChris() {
    const reasons = [
        {
            icon: Clock,
            title: 'Experienced. Knowledgeable. Professional.',
            description:
                "Real estate isn't just my career — it's my calling. I bring deep experience, market knowledge, and a professional approach to every client. Start your search and see the difference.",
        },
        {
            icon: MapPin,
            title: 'Cambridge Is Home',
            description:
                "I don't just work here — I live here. I've been in Cambridge since I was 10. I know the neighbourhoods, the streets, and which areas are on the rise. That local knowledge saves you money and headaches.",
        },
        {
            icon: TrendingUp,
            title: 'Results Across the Region',
            description:
                "From Cambridge to Kitchener, Waterloo, Guelph, and Brantford — I help clients find the right home at the right price. The listings on this site update daily. Have you checked them yet?",
        },
        {
            icon: ShieldCheck,
            title: 'Straight Talk, No Games',
            description:
                "If a house is overpriced, I'll tell you. If you're about to make a mistake, I'll stop you. I'd rather lose a deal than lose your trust. That's why my business is built on referrals and repeat clients.",
        },
        {
            icon: User,
            title: 'You Get Gretta. Period.',
            description:
                'No hand-offs to junior agents. No assistants running your deal. When you call, I answer. I keep my client list focused so every person gets my full attention. Your home search deserves that.',
        },
        {
            icon: Home,
            title: 'Free Home Evaluation. Zero Pressure.',
            description:
                "Thinking about selling? I'll give you an honest market evaluation — no obligation, no pitch. And if you're buying, the search starts right here. Browse the latest listings and let's talk about what catches your eye.",
        },
    ]

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
                    <SectionLabel text="Why Clients Choose Gretta" />
                    <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                        Results That <span className="italic text-brand-accent">Speak for Themselves</span>
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
                    {reasons.map((reason) => {
                        const Icon = reason.icon
                        return (
                            <AnimatedSection key={reason.title} className="flex flex-col text-left group">
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-bg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-display font-medium text-2xl text-brand-text mb-4">
                                    {reason.title}
                                </h3>
                                <p className="text-brand-text-muted leading-relaxed font-light">{reason.description}</p>
                            </AnimatedSection>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
