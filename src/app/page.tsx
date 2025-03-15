import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

import TagFilter from '@/app/components/TagFilter'
import { getPosts } from '@/lib/posts'

export default function Home() {
  const posts = getPosts()

  return (
    <div>
      <Navbar />
      <main className="max-w-[1000px] mx-auto px-4 py-16">
        <TagFilter initialPosts={posts} />
      </main>
      <Footer/>
    </div>
  )
}
