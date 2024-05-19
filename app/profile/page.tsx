'use client'

import Profile from '@/components/Profile'
import { IPost } from '@/types/GeneralTypes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<IPost[]>()

  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/authors/${session?.user.id}`)
      const data = await res.json()
      setPosts(data)
    }

    if (session?.user?.id) fetchPost()
  }, [session?.user.id])

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm('Are you sure want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post?._id?.toString()}`, {
          method: 'DELETE'
        })

        const filteredPost = posts?.filter((p) => p._id !== post._id)
        setPosts(filteredPost)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleEdit = (post: IPost) => {
    router.push('/update-prompt?id=' + post._id)
  }

  return (
    <section>
      <Profile
        name="My"
        description="Welcome to your personalized profile page"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  )
}
export default ProfilePage
