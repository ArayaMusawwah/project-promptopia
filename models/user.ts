import { models, model, Schema } from 'mongoose'
import { userAgentFromString } from 'next/server'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: [true, 'Email Already Exists'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
})

const User = models.User || model('User', userSchema)

export default User