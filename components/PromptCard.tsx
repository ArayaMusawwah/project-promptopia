'use client'
import { IPost } from '@/types/GeneralTypes'
import Image from 'next/image'
import { useState } from 'react'

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: IPost
  handleTagClick: (tag: string) => void
  handleDelete?: () => void
  handleEdit?: () => void
}) => {
  const [copiedText, setCopiedText] = useState<string>()

  const handleCopy = () => {
    setCopiedText(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopiedText(''), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            src={post.author.image}
            alt="user_image"
            className="rounded-full object-contain"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="truncate font-satoshi font-semibold text-gray-900">
              {post.author.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.author.email}
            </p>
          </div>
        </div>

        <div className="copied_btn" onClick={handleCopy}>
          <Image
            src={
              copiedText === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="copy_icon"
            width={16}
            height={16}
            className="mr-1 cursor-pointer object-contain"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  )
}
export default PromptCard