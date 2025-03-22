'use client'

import { useState } from 'react'
import type { BlogPost } from '../types/BlogPost'

type TagFilterProps = {
  initialPosts: BlogPost[]
  onPostsFiltered: (filteredPosts: BlogPost[]) => void // Callback for parent
}

export default function TagFilter({ initialPosts, onPostsFiltered }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(initialPosts.flatMap(post => post.tags)))

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag)
    const filtered = tag
      ? initialPosts.filter(post => post.tags.includes(tag))
      : initialPosts
    onPostsFiltered(filtered) // Pass filtered posts to parent
  }

  return (
    <div>
      <section className="mb-12">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTagSelect(null)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedTag === null
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTag === tag
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
