import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '../types/BlogPost'

type PostGridProps = {
  posts: BlogPost[]
  columns?: 2 | 3
  isRecent?: boolean
}

export default function PostGrid({ posts = [], columns = 3, isRecent = false }: PostGridProps) {
  const gridColumns = columns === 2 
    ? 'md:grid-cols-2 gap-12'
    : 'md:grid-cols-3 gap-8'

  return (
    <div className={`grid ${gridColumns}`}>
      {posts.map((post) => (
        <Link key={post.slug} href={`/post/${post.slug}`}>
          <article className="group cursor-pointer">
            <div className="aspect-[4/3] relative mb-4">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className={`font-serif mb-2 group-hover:underline ${
              isRecent ? 'text-xl' : 'text-lg'
            }`}>
              {post.title}
            </h3>
            <p className={`text-gray-600 mb-2 ${!isRecent && 'text-sm'}`}>
              {post.description}
            </p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                {post.tags?.slice(0,2)?.map(tag => (
                  <span 
                    key={`${post.slug}-${tag}`}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    {tag} 
                  </span>
                ))}
              </div>
              <time className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </time>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
