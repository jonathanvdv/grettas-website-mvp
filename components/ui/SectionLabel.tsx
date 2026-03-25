export function SectionLabel({ text, className = '' }: { text: string; className?: string }) {
    return (
        <h3
            className={`text-brand-gold tracking-[0.3em] text-[11px] font-medium uppercase mb-4 ${className}`}
        >
            {text}
        </h3>
    )
}
