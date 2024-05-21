import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt'
export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({ author: params.id }).populate('author')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(`Failed to fetch prompts => ${error}`), {
      status: 500
    })
  }
}
