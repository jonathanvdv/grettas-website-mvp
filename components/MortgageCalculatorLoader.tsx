'use client'

import dynamic from 'next/dynamic'

const MortgageCalculator = dynamic(
    () => import('@/components/MortgageCalculator').then(m => m.MortgageCalculator),
    { ssr: false }
)

export function MortgageCalculatorLoader() {
    return <MortgageCalculator />
}
