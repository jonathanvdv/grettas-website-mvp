import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface ContentMeta {
    title: string
    description: string
    date: string
    author: string
    type: string
    slug: string
    keywords: string[]
    published: boolean
    featuredImage?: string
}

export interface ContentItem {
    meta: ContentMeta
    content: string
}

function markdownToHtml(markdown: string): string {
    const result = remark().use(html).processSync(markdown)
    return result.toString()
}

function getContentFiles(subdir: string): ContentItem[] {
    const dir = path.join(CONTENT_DIR, subdir)
    if (!fs.existsSync(dir)) return []

    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
        .map((filename) => {
            const filePath = path.join(dir, filename)
            const raw = fs.readFileSync(filePath, 'utf-8')
            const { data, content } = matter(raw)
            return {
                meta: data as ContentMeta,
                content: markdownToHtml(content),
            }
        })
        .filter((item) => item.meta.published !== false)
        .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
}

export function getAllBlogPosts(): ContentItem[] {
    return getContentFiles('blog')
}

export function getBlogPost(slug: string): ContentItem | null {
    const items = getContentFiles('blog')
    return items.find((item) => item.meta.slug === slug) || null
}

export function getAllNeighbourhoodGuides(): ContentItem[] {
    return getContentFiles('neighbourhoods')
}

export function getNeighbourhoodGuide(slug: string): ContentItem | null {
    const items = getContentFiles('neighbourhoods')
    return items.find((item) => item.meta.slug === slug) || null
}
