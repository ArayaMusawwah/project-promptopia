'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { IPost } from '@/types/GeneralTypes'
import { PromptCardList } from './PromptCard'

const Feed = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>()
  const [searchedResults, setSearchedResults] = useState<IPost[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setAllPosts(data)
    }
    fetchPost()
  }, [])

  const filteredSearch = (searchText: string) => {
    const regex = new RegExp(searchText, 'i')
    return allPosts.filter(
      (post) =>
        regex.test(post.prompt) ||
        regex.test(post.tag) ||
        (post.author?.username ? regex.test(post.author?.username) : false)
    )
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    const timeoutId = setTimeout(() => {
      const searchResult = filteredSearch(e.target.value)
      setSearchedResults(searchResult)
    }, 500)

    setSearchTimeout(timeoutId)
  }

  const handleTagClick = (tag: string) => {
    setSearchText(tag)
    const searchResult = filteredSearch(tag)
    setSearchedResults(searchResult)
  }

  return (
    <section className="feed">
      <div className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or a prompt"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </div>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}
export default Feed
