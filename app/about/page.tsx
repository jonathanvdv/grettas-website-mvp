import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { TestimonialsSection } from '@/app/_components/TestimonialsSection'

export const metadata: Metadata = {
    title: 'About Gretta Hughes | REALTOR® Cambridge & Waterloo Region',
    description:
        'Learn about Gretta Hughes — a passionate REALTOR® with RE/MAX Twin City Realty in Cambridge, Ontario, serving buyers and sellers across the Waterloo Region.',
}

export default function AboutPage() {
    return (
        <div className="bg-brand-bg min-h-screen pt-20">
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex flex-col items-center justify-center">
                <Image
                    src="/images/gretta-hero.png"
                    alt="Gretta Hughes"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-bottom saturate-[1.15]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent"></div>

                <div className="relative z-10 text-center px-4 flex-1 flex items-end justify-center w-full pb-16">
                    <h1 className="font-display text-5xl md:text-7xl text-brand-text">
                        Hi, I&apos;m <span className="italic text-brand-accent">Gretta.</span>
                    </h1>
                </div>

                <div className="relative z-20 pb-8 mt-auto flex justify-center w-full">
                    <ChevronDown className="w-8 h-8 text-brand-text animate-bounce" />
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-brand-accent text-xs font-semibold uppercase tracking-widest mb-6">My Story</p>
                    <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-10 leading-tight">
                        I Know What It Means to <br className="hidden md:block" />
                        <span className="italic text-brand-accent">Find Home</span>
                    </h2>
                </div>

                <div className="prose prose-lg prose-brand max-w-none text-brand-text-muted font-light leading-relaxed space-y-6">
                    <p>
                        I was born in El Salvador and moved to Canada when I was 10 years old. Cambridge became home,
                        and it still is. I know what it feels like to search for a place where you truly belong — and
                        that experience shapes everything I do as a REALTOR&reg;.
                    </p>
                    <p>
                        Before real estate, I worked as an Early Childhood Educator and earned my Child and Youth Worker
                        diploma. Those years taught me patience, empathy, and how to guide families through significant
                        life decisions with care. Buying or selling a home is one of the biggest decisions a family makes,
                        and I bring that same level of dedication to every client.
                    </p>
                    <p>
                        I am passionate about my community — the local businesses, the natural spaces, and the vibrant
                        downtown areas that make this region special. I help my clients find homes, achieve their real
                        estate goals, and navigate the process with confidence, making every transaction as enjoyable and
                        stress-free as possible.
                    </p>
                    <p>
                        I am married and have a young daughter, so I understand firsthand how important it is to find the
                        right home for your family. Whether you are purchasing your first home, selling to move on to your
                        next chapter, or exploring investment opportunities, I am here to support you every step of the way.
                    </p>
                    <p>
                        Based in Cambridge and working with RE/MAX Twin City Realty, I bring a professional, knowledgeable,
                        and caring approach to every interaction. I look forward to helping you achieve your real estate goals.
                    </p>
                </div>
            </section>

            {/* How I Work Section */}
            <section className="py-24 bg-white border-y border-brand-border/40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="font-display text-4xl md:text-5xl text-brand-text">
                            What You Can <span className="italic text-brand-accent">Expect From Me</span>
                        </h2>
                    </div>

                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row gap-8 items-start group">
                            <div className="w-16 h-16 shrink-0 rounded-full bg-brand-bg flex items-center justify-center text-3xl shadow-sm border border-brand-border/50 group-hover:bg-brand-accent transition-colors duration-300">
                                <span className="group-hover:grayscale group-hover:brightness-200 transition-all">
                                    🏡
                                </span>
                            </div>
                            <div>
                                <h3 className="font-display text-3xl text-brand-text mb-4">If You&apos;re Buying</h3>
                                <p className="text-brand-text-muted text-lg leading-relaxed font-light">
                                    You can expect honest guidance from day one. If a property is overpriced, I will tell
                                    you. I review accurate comparables, break down what is happening in that specific
                                    neighbourhood, and help you structure a strong, strategic offer that makes sense for
                                    you. My goal is for you to feel confident in your decision — not stressed or second
                                    guessing it later.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start group">
                            <div className="w-16 h-16 shrink-0 rounded-full bg-brand-bg flex items-center justify-center text-3xl shadow-sm border border-brand-border/50 group-hover:bg-brand-accent transition-colors duration-300">
                                <span className="group-hover:grayscale group-hover:brightness-200 transition-all">
                                    📈
                                </span>
                            </div>
                            <div>
                                <h3 className="font-display text-3xl text-brand-text mb-4">If You&apos;re Selling</h3>
                                <p className="text-brand-text-muted text-lg leading-relaxed font-light">
                                    Pricing and presentation are critical. I provide a clear and realistic evaluation of
                                    your home&apos;s value in today&apos;s market, along with a detailed plan to
                                    showcase it properly. From professional marketing to a focused negotiation strategy,
                                    every step is designed to protect your bottom line and maximize your results.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start group">
                            <div className="w-16 h-16 shrink-0 rounded-full bg-brand-bg flex items-center justify-center text-3xl shadow-sm border border-brand-border/50 group-hover:bg-brand-accent transition-colors duration-300">
                                <span className="group-hover:grayscale group-hover:brightness-200 transition-all">
                                    🤝
                                </span>
                            </div>
                            <div>
                                <h3 className="font-display text-3xl text-brand-text mb-4">Either Way</h3>
                                <p className="text-brand-text-muted text-lg leading-relaxed font-light">
                                    You work directly with me. You have my personal number, and you can call or text
                                    anytime. I respond promptly and keep communication clear throughout the process. I
                                    genuinely care about my clients and their families — this is not just business to me,
                                    it is personal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials Section */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                        {/* Background */}
                        <div>
                            <p className="text-brand-accent text-xs font-semibold uppercase tracking-widest mb-8 border-b border-brand-border pb-4">
                                Background
                            </p>
                            <ul className="space-y-6 text-brand-text-muted text-lg font-light">
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>
                                        <strong className="text-brand-text">Cambridge Roots</strong>
                                        <br />
                                        <span className="text-sm">Living in Cambridge since childhood — this community is home</span>
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>
                                        <strong className="text-brand-text">Early Childhood Education Background</strong>
                                        <br />
                                        <span className="text-sm">Patience, empathy, and care for families in every interaction</span>
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>
                                        <strong className="text-brand-text">Child and Youth Worker Diploma</strong>
                                        <br />
                                        <span className="text-sm">A foundation built on helping people through life&apos;s big decisions</span>
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>
                                        <strong className="text-brand-text">Based in:</strong> Cambridge, Ontario
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Credentials */}
                        <div>
                            <p className="text-brand-accent text-xs font-semibold uppercase tracking-widest mb-8 border-b border-brand-border pb-4">
                                Credentials & Affiliations
                            </p>
                            <ul className="space-y-6 text-brand-text-muted text-lg font-light">
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>Licensed REALTOR® — Province of Ontario</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>Member: Canadian Real Estate Association (CREA)</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>Member: Waterloo Region Association of REALTORS® (WRAR)</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span>Brokerage: RE/MAX Twin City Realty Inc.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <TestimonialsSection />

            {/* CTA */}
            <section className="py-24 md:py-32 bg-white text-center px-4">
                <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                    Let&apos;s Find Out If We&apos;re a <span className="italic text-brand-accent">Good Fit</span>
                </h2>
                <p className="text-brand-text-muted text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    No pitch, no pressure. Just a conversation about what you&apos;re trying to do and whether I&apos;m
                    the right person to help.
                </p>
                <Link
                    href="/contact"
                    className="inline-block bg-brand-accent hover:bg-brand-accent-light text-white px-10 py-5 uppercase tracking-wider text-sm font-medium transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                    Reach Out to Gretta &#8594;
                </Link>
            </section>
        </div>
    )
}
