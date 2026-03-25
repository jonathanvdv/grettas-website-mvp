import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://grettahughes.ca'

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/neighbourhoods`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/mortgage-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ]

    const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.meta.slug}`,
        lastModified: new Date(post.meta.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticPages, ...blogPosts]
}
