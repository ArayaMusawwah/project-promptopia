import { IPost } from '@/types/GeneralTypes'
import PromptCard from './PromptCard'

interface Props {
  name: string
  description: string
  data: IPost[] | undefined
  handleDelete: (post: IPost) => void
  handleEdit: (post: IPost) => void
}

const Profile: React.FC<Props> = ({
  name,
  description,
  data,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="prompt_layout mt-10">
        {data?.map((post: IPost) => (
          <PromptCard
            key={post.author?._id}
            post={post}
            handleTagClick={() => {}}
            handleDelete={() => handleDelete(post)}
            handleEdit={() => handleEdit(post)}
          />
        ))}
      </div>
    </div>
  )
}
export default Profile
