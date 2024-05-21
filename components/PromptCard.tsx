'use client'

import { IPost } from '@/types/GeneralTypes'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete
}: {
  post: IPost
  handleTagClick: (tag: string) => void
  handleDelete?: () => void
  handleEdit?: () => void
}) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copiedText, setCopiedText] = useState<string>()

  const handleProfileClick = () => {
    if (post.author?._id === session?.user?.id)
      router.push(`/profile/${session?.user?.id}`)
    else
      router.push(`/profile/${post.author?._id}?name=${post.author?.username}`)
  }

  const handleCopy = () => {
    setCopiedText(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopiedText(''), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="group flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={handleProfileClick}
        >
          <Image
            src={post.author?.image || ''}
            alt="user-image"
            className="rounded-full object-contain"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="truncate font-satoshi font-semibold text-gray-900 group-hover:text-primary-orange">
              {post.author?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.author?.email}
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

      {session?.user.id === post.author?._id &&
        pathName.includes('/profile/') && (
          <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
            <p
              className="green_gradient cursor-pointer font-inter text-sm"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="red_gradient cursor-pointer font-inter text-sm"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  )
}

export const PromptCardList = ({
  data,
  handleTagClick
}: {
  data: IPost[]
  handleTagClick: (tag: string) => void
}) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post: IPost) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default PromptCard
