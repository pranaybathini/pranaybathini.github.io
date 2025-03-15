'use client'

import { useState } from 'react'
import type { BlogPost } from '../types/BlogPost'
import PostGrid from './PostGrid'

type TagFilterProps = {
  initialPosts: BlogPost[]
}

export default function TagFilter({ initialPosts }: TagFilterProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  const allTags = Array.from(new Set(initialPosts?.flatMap(post => post.tags) || []))

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag)
    const filtered = tag 
      ? initialPosts.filter(post => post.tags.includes(tag))
      : initialPosts
    setPosts(filtered)
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

      <section className="mb-16">
        <h2 className="font-serif text-3xl mb-8">Recent Stories</h2>
        <PostGrid 
          posts={posts.slice(0, 2)} 
          columns={2} 
          isRecent={true}
        />
      </section>

      <section>
        <h2 className="font-serif text-3xl mb-8">More Stories</h2>
        <PostGrid 
          posts={posts.slice(2)} 
          columns={3}
        />
      </section>
    </div>
  )
}
