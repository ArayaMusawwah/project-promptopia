'use client'

import Form from '@/components/Form'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IPost } from '@/types/GeneralTypes'

const ReturnerForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [post, setPost] = useState<IPost>({
    prompt: '',
    tag: ''
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    fetchPost()
  }, [promptId])

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (!promptId) return

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (!res.ok) return
      router.back()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitted={isSubmitted}
      handleSubmit={updatePrompt}
    />
  )
}

const UpdatePromptPage = () => {
  return (
    <Suspense>
      <ReturnerForm />
    </Suspense>
  )
}

export default UpdatePromptPage
