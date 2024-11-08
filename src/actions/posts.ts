import { post_canister } from '@/declarations/post_canister'

type PostCanister = typeof post_canister

export const likeUnlikePost = async (actor: PostCanister, postId: bigint) => {
  if (!actor) return { success: false, error: 'Missing post_canister actor' }
  if (!postId && Number(postId) !== 0) return { success: false, error: 'Missing postId' }

  try {
    const res = await actor.api_like_unlike_post(postId)

    if ('Ok' in res) {
      return { success: true }
    } else {
      return { success: false, error: res.Err }
    }
  } catch (error) {
    return { success: false, error }
  }
}
