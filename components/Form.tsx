import { IPost } from '@/types/GeneralTypes'
import Link from 'next/link'
import React from 'react'

type Props = {
  type: string
  post: IPost
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string
      tag: string
    }>
  >
  isSubmitted: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
}
const Form: React.FC<Props> = ({
  type,
  post,
  setPost,
  isSubmitted,
  handleSubmit,
}) => {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea px-4 py-2"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Tag{' '}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input px-4 py-2"
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            className="rounded-full bg-orange-500 px-5 py-1.5 text-sm text-white"
            disabled={isSubmitted}
            onClick={handleSubmit}
          >
            {isSubmitted ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}
export default Form
