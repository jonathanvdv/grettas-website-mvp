'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react'

export function ImageGallery({ photos, address }: { photos: string[], address?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    if (!photos || photos.length === 0) {
        return (
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No images available</span>
            </div>
        )
    }

    const handleNext = useCallback(() => setCurrentIndex((prev) => (prev + 1) % photos.length), [photos.length])
    const handlePrev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length), [photos.length])

    const openFullscreen = (index: number) => {
        setCurrentIndex(index)
        setIsFullscreen(true)
    }

    useEffect(() => {
        if (!isFullscreen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext()
            else if (e.key === 'ArrowLeft') handlePrev()
            else if (e.key === 'Escape') setIsFullscreen(false)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isFullscreen, handleNext, handlePrev])

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isFullscreen])

    const gridPhotos = photos.slice(0, 5)
    const remainingCount = photos.length - 5

    return (
        <>
            {/* Photo Grid: 1 large left + 4 smaller right (2x2), like Realtor.ca */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-lg overflow-hidden h-[240px] sm:h-[300px] md:h-[440px]">
                {/* Main large photo - spans 2 rows on left */}
                <button
                    className="relative md:col-span-2 md:row-span-2 h-full cursor-pointer group overflow-hidden"
                    onClick={() => openFullscreen(0)}
                >
                    <Image
                        src={gridPhotos[0]}
                        alt={address ? `${address} - Photo 1` : 'Property photo 1'}
                        fill
                        className="object-cover group-hover:brightness-95 transition-all duration-200"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        unoptimized
                    />
                </button>

                {/* Right 4 photos in 2x2 grid */}
                {[1, 2, 3, 4].map((i) => {
                    const photo = gridPhotos[i]
                    const isLast = i === 4
                    if (!photo) return <div key={i} className="hidden md:block bg-gray-100" />
                    return (
                        <button
                            key={i}
                            className="relative hidden md:block h-full cursor-pointer group overflow-hidden"
                            onClick={() => openFullscreen(i)}
                        >
                            <Image
                                src={photo}
                                alt={address ? `${address} - Photo ${i + 1}` : `Property photo ${i + 1}`}
                                fill
                                className="object-cover group-hover:brightness-95 transition-all duration-200"
                                sizes="25vw"
                                unoptimized
                            />
                            {isLast && remainingCount > 0 && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/30">
                                    <span className="flex items-center gap-2 text-white font-semibold text-lg">
                                        <ImageIcon className="w-5 h-5" />
                                        + {remainingCount}
                                    </span>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Fullscreen Lightbox */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
                    onClick={(e) => { if (e.target === e.currentTarget) setIsFullscreen(false) }}
                >
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-5 right-5 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
                        {currentIndex + 1} / {photos.length}
                    </div>

                    <div className="relative w-full h-[80vh] flex items-center justify-center px-16">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={photos[currentIndex]}
                            alt={address ? `${address} - Photo ${currentIndex + 1}` : `Property photo ${currentIndex + 1}`}
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                            draggable={false}
                        />

                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-50"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-50"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex gap-2 mt-4 overflow-x-auto max-w-[90vw] pb-2">
                        {photos.map((photo, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${index === currentIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                            >
                                <Image
                                    src={photo}
                                    alt={address ? `${address} - Thumbnail ${index + 1}` : `Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
