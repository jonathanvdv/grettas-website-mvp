'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface ContentEntry {
    title: string
    slug: string
    date: string
    description?: string
    featuredImage?: string
    author: string
    type: 'blog' | 'neighbourhood'
    href: string
}

interface BlogPageClientProps {
    posts: ContentEntry[]
    neighbourhoods: ContentEntry[]
    hasNeighbourhoods: boolean
}

export function BlogPageClient({ posts, neighbourhoods, hasNeighbourhoods }: BlogPageClientProps) {
    const [filter, setFilter] = useState<'all' | 'blog' | 'neighbourhood'>('all')

    const allItems = [...posts, ...neighbourhoods]
    const filtered = filter === 'all' ? allItems : allItems.filter((item) => item.type === filter)

    const featured = posts[0] || null
    const showHero = filter !== 'neighbourhood' && featured

    const isEmpty = posts.length === 0 && neighbourhoods.length === 0

    return (
        <div className="bg-white min-h-screen pt-[124px] lg:pt-[136px] pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {showHero && (
                    <section className="mb-14">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-end mb-8">
                            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-brand-text leading-[1.1]">
                                {featured.title}
                            </h1>
                            <div className="hidden lg:block">
                                <p className="text-brand-text-muted font-light text-sm leading-relaxed mb-4">
                                    {featured.description}
                                </p>
                                <Link
                                    href={featured.href}
                                    className="inline-block border border-brand-text text-brand-text px-6 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-brand-text hover:text-white transition-colors"
                                >
                                    Read full blog
                                </Link>
                            </div>
                        </div>

                        <Link href={featured.href} className="block">
                            <div className="relative w-full aspect-[2.2/1] rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                    src={featured.featuredImage || '/images/house-1.webp'}
                                    alt={featured.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 1100px"
                                />
                            </div>
                        </Link>

                        <div className="lg:hidden mt-6">
                            <p className="text-brand-text-muted font-light text-sm leading-relaxed mb-4">
                                {featured.description}
                            </p>
                            <Link
                                href={featured.href}
                                className="inline-block border border-brand-text text-brand-text px-6 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-brand-text hover:text-white transition-colors"
                            >
                                Read full blog
                            </Link>
                        </div>

                        <div className="mt-8 flex items-center">
                            <div className="h-[3px] flex-1 bg-brand-border/30" />
                            <div className="h-[3px] w-28 bg-brand-accent" />
                        </div>
                    </section>
                )}

                {isEmpty && (
                    <div className="text-center py-32">
                        <h1 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                            <span className="italic text-brand-accent">Blog</span>
                        </h1>
                        <p className="text-brand-text-muted text-lg font-light italic">
                            Check back soon for insights on the Waterloo Region real estate market.
                        </p>
                    </div>
                )}

                {!isEmpty && (
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
                        <aside className="lg:sticky lg:top-[160px] lg:self-start">
                            <h2 className="text-sm font-semibold text-brand-text mb-4">Quick Filters :</h2>
                            <div className="space-y-2">
                                <FilterCheckbox
                                    active={filter === 'all'}
                                    onClick={() => setFilter('all')}
                                    label="All"
                                />
                                <FilterCheckbox
                                    active={filter === 'blog'}
                                    onClick={() => setFilter('blog')}
                                    label="Blog Posts"
                                />
                                {hasNeighbourhoods && (
                                    <FilterCheckbox
                                        active={filter === 'neighbourhood'}
                                        onClick={() => setFilter('neighbourhood')}
                                        label="Neighbourhood Guides"
                                    />
                                )}
                            </div>
                        </aside>

                        <div className="divide-y divide-brand-border/30">
                            {filtered.map((item) => (
                                <article key={`${item.type}-${item.slug}`} className="py-8 first:pt-0">
                                    <div className="flex gap-5 items-start">
                                        <Link href={item.href} className="hidden sm:block shrink-0">
                                            <div className="relative w-[100px] h-[100px] rounded-md overflow-hidden bg-gray-100">
                                                <Image
                                                    src={item.featuredImage || '/images/house-1.webp'}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </Link>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">
                                                    {item.type === 'neighbourhood'
                                                        ? 'Neighbourhood Guide'
                                                        : 'Blog Post'}
                                                </span>
                                                {item.date && (
                                                    <>
                                                        <span className="hidden sm:block h-px w-12 bg-brand-border/50" />
                                                        <time className="text-[10px] text-brand-text-muted tracking-wide">
                                                            {new Date(item.date).toLocaleDateString('en-CA', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </time>
                                                    </>
                                                )}
                                            </div>

                                            <h3 className="font-body text-lg font-semibold text-brand-text mb-1.5 leading-snug">
                                                <Link
                                                    href={item.href}
                                                    className="hover:text-brand-accent transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                            </h3>

                                            {item.description && (
                                                <p className="text-brand-text-muted font-light text-sm leading-relaxed mb-3 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}

                                            <Link
                                                href={item.href}
                                                className="text-brand-text text-sm font-medium hover:text-brand-accent transition-colors"
                                            >
                                                Read full {item.type === 'neighbourhood' ? 'guide' : 'blog'}
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {filtered.length === 0 && (
                                <div className="py-16 text-center">
                                    <p className="text-brand-text-muted font-light italic">
                                        No {filter === 'blog' ? 'blog posts' : 'neighbourhood guides'} yet. Check back
                                        soon.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function FilterCheckbox({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2.5 w-full text-left py-1 text-sm transition-colors group"
        >
            <span
                className={`w-[18px] h-[18px] rounded-[3px] border flex items-center justify-center shrink-0 transition-all ${
                    active
                        ? 'bg-brand-accent border-brand-accent'
                        : 'border-brand-border group-hover:border-brand-text-muted'
                }`}
            >
                {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </span>
            <span className={`${active ? 'text-brand-text font-medium' : 'text-brand-text-muted'}`}>{label}</span>
        </button>
    )
}
