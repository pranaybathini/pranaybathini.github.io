import Archives from '../components/Archives'
import type { BlogPost } from '../types/BlogPost'
import { getPosts } from '@/lib/posts'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export default async function ArchivesPage() {
  // Fetch blog posts dynamically
  const allPosts: BlogPost[] = await getPosts()

  return (
    <div>
            <Navbar />
      <Archives allPosts={JSON.parse(JSON.stringify(allPosts))} />
            <Footer/>
      
    </div>
  )
}
