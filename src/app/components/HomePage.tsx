'use client'

import type { BlogPost } from '../types/BlogPost'
import PostGrid from './PostGrid'

type HomePageProps = {
  initialPosts: BlogPost[]
}

export default function HomePage({ initialPosts }: HomePageProps) {
  const posts = initialPosts.slice(0, 11) // Limit to 11 posts

  return (
    <div>
      <section className="mb-16">
        <h2 className="font-serif text-3xl mb-8">Recent Stories</h2>
        <PostGrid posts={posts.slice(0, 2)} columns={2} isRecent={true} />
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-3xl mb-8">More Stories</h2>
        <PostGrid posts={posts.slice(2)} columns={3} />
      </section>

      <div className="text-center">
        <a
          href="/archives"
          className="inline-block px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800"
        >
          See More Posts
        </a>
      </div>
    </div>
  )
}
