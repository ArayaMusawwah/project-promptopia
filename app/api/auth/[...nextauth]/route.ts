import User from '@/models/user'
import { IProfile } from '@/types/GeneralTypes'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  /* ==TODO== TypeError: FIX TYPE OF ANY */
  callbacks: {
    //@ts-ignore
    async session({ session }: { session: Session }) {
      const userSession = await User.findOne({
        email: session?.user?.email,
      })

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: userSession._id.toString(),
        },
      }

      return updatedSession
    },

    //@ts-ignore
    async signIn({ profile }: { profile: IProfile }) {
      try {
        await connectToDB()
        const existingUser = await User.findOne({
          email: profile?.email,
        })

        if (!existingUser) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.toLowerCase().replaceAll(' ', ''),
            image: profile?.picture?.toString(),
          })
        }

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
