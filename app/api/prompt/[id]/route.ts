import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt'
import { NextResponse } from 'next/server'

//Read
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('author')

    if (!prompt) return NextResponse.json(`Prompt not found`, { status: 404 })

    return NextResponse.json(prompt, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Failed to fetch prompts => ${error}`, {
      status: 500
    })
  }
}

//Edit
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json()
  try {
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt)
      return NextResponse.json(`Prompt not found`, { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()
    return NextResponse.json(existingPrompt, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Failed to fetch prompts => ${error}`, {
      status: 500
    })
  }
}

//Delete
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()
    await Prompt.findByIdAndDelete(params.id)
    // if (!prompt) return NextResponse.json(`Prompt not found`, { status: 404 })
    return NextResponse.json(`Prompt deleted successfully`, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Failed to fetch prompts => ${error}`, {
      status: 500
    })
  }
}
