export function sanitizeHtml(html: string): string {
    // Remove script tags and their content
    let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    clean = clean.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    clean = clean.replace(/\s+on\w+\s*=\s*\S+/gi, '')
    // Remove javascript: URLs
    clean = clean.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '')
    return clean
}
