'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signOut, getProviders, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

/* TODO: FIX TYPE OF ANYs */

const Nav = () => {
  const isUserLoggedIn = true
  const [providers, setProviders] = useState<any>(null)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    const setProvider = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setProvider()
  }, [])

  return (
    <nav className="flex-between mb-16 flex w-full pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider: any) => (
            <button
              className="black_btn"
              type="button"
              key={provider.name}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          ))
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex sm:hidden">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={'/assets/images/logo.svg'}
              width={36}
              height={36}
              alt="User Profile Picture"
              className="object-contain"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={'/create-prompt'}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href={'/create-prompt'}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="black_btn my-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider: any) => (
            <button
              className="black_btn"
              type="button"
              key={provider.name}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  )
}
export default Nav
