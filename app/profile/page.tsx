'use client'

import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/authors/${session?.user.id}`)
      const data = await res.json()
      setPosts(data)
    }

    if (session?.user?.id) fetchPost()
  }, [session?.user.id])

  const handleDelete = () => {}
  const handleEdit = () => {}

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
