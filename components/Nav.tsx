'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  signOut,
  getProviders,
  signIn,
  useSession,
  LiteralUnion,
  ClientSafeProvider
} from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BuiltInProviderType } from 'next-auth/providers/index'

const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>()
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setupProviders()
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
        {session ? (
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
            <Link
              href={`/profile/${session?.user?.id}`}
              className="flex-center"
            >
              <Image
                src={session?.user?.image || ''}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          /* ==TODO== FIX BUG: TIDAK MUNCUL PAS PERTAMA KALI LOAD JALANIN SERVER */
          providers &&
          Object.values(providers).map((provider) => (
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
        {session ? (
          <div className="flex">
            <Image
              src={session?.user?.image || ''}
              width={40}
              height={40}
              alt="User Profile Picture"
              className="cursor-pointer rounded-full object-contain"
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
          Object.values(providers).map((provider) => (
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
