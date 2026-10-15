import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
  image?: string
  url?: string
}

export function Seo({
  title,
  description = 'Fullstack Engineer portfolio — CLI and GUI modes, projects, and contact.',
  image,
  url,
}: SeoProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Fullstack Engineer`

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const updateProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    updateMetaTag('description', description)
    updateProperty('og:title', title)
    updateProperty('og:description', description)
    if (image) updateProperty('og:image', image)
    if (url) updateProperty('og:url', url)
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    if (image) updateMetaTag('twitter:image', image)
  }, [title, description, image, url])

  return null
}
