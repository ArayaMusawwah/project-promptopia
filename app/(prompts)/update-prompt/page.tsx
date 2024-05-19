'use client'

import Form from '@/components/Form'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IPost } from '@/types/GeneralTypes'

const UpdatePromptPage = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [post, setPost] = useState<IPost>({
    prompt: '',
    tag: ''
  })

  const promptId = useSearchParams().get('id')
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/prompt/${promptId}`)
      .then((res) => res.json())
      .then((data) =>
        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
      )
  }, [promptId])

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (!promptId) return alert('Invalid Prompt ID')

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
export default UpdatePromptPage
