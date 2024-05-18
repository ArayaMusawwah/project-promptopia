import React from 'react'

const Home: React.FC = () => {
  return (
    <section className="w-full flex-col text-center">
      <h1 className="head_text">
        Discover & Share
        <br className="max-md:hidden" />
        <p className="orange_gradient">AI-Powered Prompts</p>
      </h1>
      <span className="decs">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </span>
    </section>
  )
}

export default Home
