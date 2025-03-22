import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

import { getPosts } from '@/lib/posts'
import HomePage from '@/app/components/HomePage'

export default function Home() {
  const posts = getPosts()

  return (
    <div>
      <Navbar />
      <main className="max-w-[1000px] mx-auto px-4 py-16">
        <HomePage initialPosts={posts} />
      </main>
      <Footer/>
    </div>
  )
}
