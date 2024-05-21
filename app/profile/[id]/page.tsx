'use client'

import Profile from '@/components/Profile'
import { IPost } from '@/types/GeneralTypes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<IPost[]>()

  const router = useRouter()

  const searchParams = useSearchParams()
  const username = searchParams.get('name')
  console.log('ProfilePage ~ username =>', username)

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/authors/${params.id}`)
      const data = await res.json()
      setPosts(data)
    }

    if (params.id) fetchPost()
  }, [params.id])

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
        name={username || 'My'}
        description="Welcome to your personalized profile page"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  )
}
export default ProfilePage
