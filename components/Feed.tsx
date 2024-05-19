'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { IPost } from '@/types/GeneralTypes'
const Feed = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [posts, setPosts] = useState<IPost[]>([])

  const PromptCardList = ({
    data,
    handleTagClick
  }: {
    data: IPost[]
    handleTagClick: () => void
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

  const handleSearchText = () => {}

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPosts(data)
    }
    fetchPost()
  }, [])

  return (
    <section className="feed">
      <div className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or a prompt"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </div>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}
export default Feed
