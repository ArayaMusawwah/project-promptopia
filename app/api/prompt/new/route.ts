import Prompt from '@/models/prompt'
import { connectToDB } from '@/utils/database'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json()

  try {
    await connectToDB()

    const newPrompt = new Prompt({
      author: userId,
      prompt,
      tag,
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify(`Failed to create new prompt: ${error}`),
      { status: 500 },
    )
  }
}
