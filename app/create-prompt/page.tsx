'use client'

import Form from '@/components/Form'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

export type MySession = Session & {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const CreatePrompt = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  // ==TODO== TypeError: FIX session type

  /* @ts-ignore */
  const { data: session }: { data: MySession } = useSession()

  const router = useRouter()

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: (session?.user && session?.user.id) || null,
          tag: post.tag,
        }),
      })

      if (!res.ok) return
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmitted={isSubmitted}
      handleSubmit={createPrompt}
    />
  )
}
export default CreatePrompt
