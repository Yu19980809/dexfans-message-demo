import { string, object, optional } from 'zod'

export const ProfileSchema = object({
  username: string().min(1, 'Username is required'),
  bio: optional(
    string().min(1, 'Bio is required')
  ),
  avatar: optional(string()),
  coverImage: optional(string())
})
