import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt'
export const GET = async () => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('author')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(`Failed to fetch prompts: ${error}`), {
      status: 500,
    })
  }
}
