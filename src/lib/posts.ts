import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import type { BlogPost } from '@/app/types/BlogPost'

const postsDirectory = join(process.cwd(), 'posts')

export function getPosts(): BlogPost[] {
  const fileNames = readdirSync(postsDirectory)
  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = join(postsDirectory, fileName)
      const fileContents = readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return { slug, ...data } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
