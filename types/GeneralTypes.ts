export interface IProfile {
  _id: string
  name: string
  email: string
  image: string
}

export interface IPost {
  _id?: string
  author?: {
    _id: string
    username: string
    image: string
    email: string
  }
  prompt: string
  tag: string
}
