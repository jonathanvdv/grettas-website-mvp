'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/contact-schema'

type FormData = ContactFormData
const schema = contactSchema

export function ContactForm({
    className = '',
    defaultMessage = '',
    defaultIntent,
    listingAddress,
}: {
    className?: string
    defaultMessage?: string
    defaultIntent?: FormData['intent']
    listingAddress?: string
}) {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            message: defaultMessage,
            intent: defaultIntent,
            listingAddress: listingAddress,
        },
    })

    const onSubmit = async (data: FormData) => {
        setIsError(false)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Submission failed')
            setIsSuccess(true)
            reset()
        } catch (err) {
            console.error(err)
            setIsError(true)
        }
    }

    if (isSuccess) {
        return (
            <div className={`bg-brand-bg-alt p-8 text-center border border-brand-border/50 ${className}`}>
                <h3 className="text-xl font-display font-medium text-brand-text mb-2">Got it!</h3>
                <p className="text-brand-text-muted font-light">
                    Thanks, Gretta will reach out personally within one business day. If it&apos;s urgent, feel free to
                    call or text directly.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-brand-gold text-sm font-medium hover:underline"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5 ${className}`} suppressHydrationWarning>
            {isError && (
                <div className="p-4 bg-red-50 text-red-700 text-sm mb-4">
                    There was an error sending your message. Please try again or contact Gretta directly.
                </div>
            )}

            {listingAddress ? <input type="hidden" {...register('listingAddress')} /> : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div suppressHydrationWarning>
                    <label
                        htmlFor="firstName"
                        className="block text-[10px] font-medium text-brand-text-muted mb-2 uppercase tracking-[0.15em]"
                    >
                        First Name *
                    </label>
                    <input
                        {...register('firstName')}
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="w-full border border-brand-border/60 px-4 py-3 bg-brand-bg text-sm focus:outline-none focus:border-brand-gold/60 transition-colors duration-300"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-[10px] font-medium text-brand-text-muted mb-2 uppercase tracking-[0.15em]"
                    >
                        Last Name *
                    </label>
                    <input
                        {...register('lastName')}
                        id="lastName"
                        type="text"
                        placeholder="Smith"
                        className="w-full border border-brand-border/60 px-4 py-3 bg-brand-bg text-sm focus:outline-none focus:border-brand-gold/60 transition-colors duration-300"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-[10px] font-medium text-brand-text-muted mb-2 uppercase tracking-[0.15em]"
                    >
                        Email *
                    </label>
                    <input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full border border-brand-border/60 px-4 py-3 bg-brand-bg text-sm focus:outline-none focus:border-brand-gold/60 transition-colors duration-300"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-[10px] font-medium text-brand-text-muted mb-2 uppercase tracking-[0.15em]"
                    >
                        Phone
                    </label>
                    <input
                        {...register('phone')}
                        id="phone"
                        type="tel"
                        placeholder="(519) 555-0123"
                        className="w-full border border-brand-border/60 px-4 py-3 bg-brand-bg text-sm focus:outline-none focus:border-brand-gold/60 transition-colors duration-300"
                    />
                </div>
            </div>

            {!defaultIntent && !listingAddress && (
                <div>
                    <label className="block text-[10px] font-medium text-brand-text-muted mb-3 uppercase tracking-[0.15em]">
                        I&apos;m looking to:
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {['Buy', 'Sell', 'Both', 'Just Curious'].map((intent) => (
                            <label
                                key={intent}
                                className="flex items-center gap-2 cursor-pointer text-sm text-brand-text-muted hover:text-brand-text transition-colors"
                            >
                                <input
                                    type="radio"
                                    value={intent}
                                    {...register('intent')}
                                    className="accent-brand-gold"
                                />
                                <span className="font-light">{intent}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label
                    htmlFor="message"
                    className="block text-[10px] font-medium text-brand-text-muted mb-2 uppercase tracking-[0.15em]"
                >
                    Message *
                </label>
                <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    placeholder="Tell me a bit about what you're thinking. There are no wrong answers here."
                    className="w-full border border-brand-border/60 px-4 py-3 bg-brand-bg text-sm focus:outline-none focus:border-brand-gold/60 transition-colors duration-300 resize-y"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-text hover:bg-brand-text/85 text-white font-medium px-8 py-4 transition-all w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 duration-300"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
