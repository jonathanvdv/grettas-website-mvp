'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

function NavDropdown({ label, items, isScrolled }: { label: string; items: { name: string; href: string }[]; isScrolled: boolean }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'} relative group`}>
                {label} <ChevronDown className="w-4 h-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-accent transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const isHome = pathname === '/'

    // Prefetch map pins data so /listings map view loads instantly
    useEffect(() => {
        if (pathname !== '/listings') {
            // Fire and forget — warms the server-side cache
            fetch('/api/listings/map-pins', { priority: 'low' as any }).catch(() => {})
        }
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80)
        }

        if (!isHome) {
            setIsScrolled(true)
            return
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHome])

    const simpleLinks = [
        { name: 'Home', href: '/' },
        { name: 'Neighbourhoods', href: '/neighbourhoods' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    const listingsItems = [
        { name: "Abdul's Listings", href: '/listings/my-listings' },
        { name: 'Home Search', href: '/listings' },
    ]

    const toolsItems = [
        { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
        { name: 'Home Evaluation', href: '/home-evaluation' },
    ]

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo / Brand */}
                    <Link href="/" className="z-50 relative group">
                        <div className="flex flex-col">
                            <span className={`font-display text-xl md:text-2xl font-bold transition-colors ${isScrolled ? 'text-brand-text' : 'text-brand-text md:text-brand-bg-dark'}`}>
                                Abdul Basharmal
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.2em] mt-0.5 transition-colors ${isScrolled ? 'text-brand-text-muted' : 'text-brand-text-muted md:text-brand-text'}`}>
                                REALTOR® · RE/MAX Twin City
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'} relative group`}
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                        </Link>

                        <NavDropdown label="Listings" items={listingsItems} isScrolled={isScrolled} />

                        {simpleLinks.slice(1).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'} relative group`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        <NavDropdown label="Tools" items={toolsItems} isScrolled={isScrolled} />
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href="tel:905-906-0045" className={`flex items-center gap-2 text-sm font-medium group transition-colors ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'}`}>
                            <Phone className="w-4 h-4 text-brand-accent group-hover:text-brand-accent-light transition-colors" />
                            <div className="flex flex-col items-end">
                                <span className="text-base">(905) 906-0045</span>
                                <span className="text-[10px] text-brand-text-muted uppercase tracking-wider">Call or Text</span>
                            </div>
                        </a>
                        <Link
                            href="/contact"
                            className="bg-brand-accent hover:bg-brand-accent-light text-white px-6 py-2.5 rounded-sm text-sm font-medium transition-colors shadow-sm"
                        >
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className={`w-6 h-6 ${isScrolled || mobileMenuOpen ? 'text-brand-text' : 'text-brand-bg-dark'}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 bg-white z-40 md:hidden pt-24 px-6 overflow-y-auto pb-8 flex flex-col"
                    >
                        <nav className="flex flex-col gap-6 text-xl font-display mt-8">
                            <Link href="/" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>

                            <div>
                                <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Listings</span>
                                <div className="flex flex-col gap-4 pl-2">
                                    <Link href="/listings/my-listings" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Abdul's Listings</Link>
                                    <Link href="/listings" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Home Search</Link>
                                </div>
                            </div>

                            <Link href="/neighbourhoods" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Neighbourhoods</Link>
                            <Link href="/about" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
                            <Link href="/contact" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

                            <div>
                                <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Tools</span>
                                <div className="flex flex-col gap-4 pl-2">
                                    <Link href="/mortgage-calculator" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Mortgage Calculator</Link>
                                    <Link href="/home-evaluation" className="text-brand-text hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Home Evaluation</Link>
                                </div>
                            </div>
                        </nav>

                        <div className="mt-auto pt-12 pb-6">
                            <p className="text-brand-text-muted uppercase text-xs tracking-wider mb-4">Get in Touch</p>
                            <a
                                href="tel:905-906-0045"
                                className="flex items-center justify-center gap-2 w-full border border-brand-border bg-white text-brand-text px-6 py-4 rounded-sm font-medium transition-colors mb-3 shadow-sm"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Phone className="w-5 h-5 text-brand-accent" />
                                <span>Call or Text Me</span>
                            </a>
                            <Link
                                href="/contact"
                                className="block text-center w-full bg-brand-accent hover:bg-brand-accent-light text-white px-6 py-4 rounded-sm font-medium transition-colors shadow-sm"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
