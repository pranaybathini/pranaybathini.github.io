import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/app/types/BlogPost';

const postsDirectory = join(process.cwd(), 'posts');

export function getPosts(): BlogPost[] {
  const fileNames = readdirSync(postsDirectory);

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, ''); // Extract slug from filename
      const fullPath = join(postsDirectory, fileName); // Full path to the file
      
      // Read only the first part of the file (limit to the first 1KB or so)
      const fileContents = readFileSync(fullPath, 'utf8');
      const frontmatterEnd = fileContents.indexOf('---', 4); // Find the closing `---` for the frontmatter
      const partialFile = fileContents.substring(0, frontmatterEnd + 3); // Read only until the frontmatter ends

      // Parse the frontmatter using gray-matter
      const { data } = matter(partialFile);

      return {
        slug,
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
        tags: data.tags,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date
}
