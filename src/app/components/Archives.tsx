'use client'

import type { BlogPost } from '../types/BlogPost'
import { format } from 'date-fns'
import Image from 'next/image'

type ArchivesProps = {
  allPosts: BlogPost[]
}

export default function Archives({ allPosts }: ArchivesProps) {
  // Group posts by year and month
  const groupedPosts = allPosts.reduce((acc, post) => {
    const [year, month] = post.date.split('-')
    const key = `${year}-${month}`
    if (!acc[key]) acc[key] = []
    acc[key].push(post)
    return acc
  }, {} as Record<string, BlogPost[]>)

  // Sort keys in descending order
  const sortedKeys = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a))

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-bold mb-10">Archives</h1>
      <div className="space-y-12">
        {sortedKeys.map((key) => {
          const [year, month] = key.split('-')
          const posts = groupedPosts[key]
          return (
            <div key={key}>
              <h2 className="font-serif text-2xl font-semibold mb-6">
                {year} - {format(new Date(Number(year), Number(month) - 1), 'MMMM')}
              </h2>
              <ul className="space-y-8">
                {posts.map((post) => (
                  <li
                    key={post.slug}
                    className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0"
                  >
                    {/* Post Image */}
                    <Image
                      width={160}
                      height={160}
                      src={post.image}
                      alt={post.title}
                      className="w-full md:w-40 h-40 object-cover rounded-lg shadow"
                    />

                    {/* Post Content */}
                    <div>
                      <a
                        href={`/post/${post.slug}`}
                        className="text-xl font-bold text-black hover:text-blue-600 hover:underline"
                      >
                        {post.title}
                      </a>
                      <p className="text-sm text-gray-500 mt-2">
                        {format(new Date(post.date), 'MMMM dd, yyyy')}
                      </p>
                      <p className="text-gray-700 mt-4">{post.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
