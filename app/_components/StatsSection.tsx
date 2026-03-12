'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface StatProps {
    end: number
    suffix?: string
    prefix?: string
    label: string
}

function Counter({ end, suffix = '', prefix = '', label }: StatProps) {
    const ref = useRef(null)
    const [count, setCount] = useState(0)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, end, {
                duration: 2,
                ease: 'easeOut',
                onUpdate: (value) => {
                    setCount(Math.round(value))
                }
            })
            return controls.stop
        }
    }, [end, isInView])

    return (
        <div className="flex flex-col items-center text-center p-6 border-r border-brand-border/10 last:border-r-0 md:border-b-0 border-b md:last:border-b-0">
            <span ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-accent text-brand-gold mb-2 font-light tabular-nums">
                {prefix}{count}{suffix}
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase text-brand-text-muted">
                {label}
            </span>
        </div>
    )
}

export function StatsSection() {
    return (
        <section className="bg-brand-bg-dark text-white py-12 lg:py-16 border-y border-brand-border/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-12">
                        <Counter end={15} suffix="+" label="Years in Cambridge" />
                        <Counter end={5} label="Cities Served" />
                        <Counter end={100} suffix="%" label="Client Focused" />
                        <Counter end={24} suffix="hr" label="Response Time" />
                    </div>

                    <div className="text-center mt-12 pt-12 border-t border-brand-border/10">
                        <p className="italic text-brand-text-muted text-sm md:text-base leading-relaxed">
                            &ldquo;Every client deserves the same care my family received when we first arrived in Canada — that&apos;s the standard I hold myself to.&rdquo;
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
