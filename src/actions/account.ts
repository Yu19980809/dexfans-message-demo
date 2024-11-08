import { index_canister } from '@/declarations/index_canister'
import { UserInputArgs } from '@/declarations/index_canister/index_canister.did'

type IndexCanister = typeof index_canister

export const getMyProfile = async (actor: IndexCanister) => {
  if (!actor) return { success: false, error: 'Missing index_canister' }

  try {
    const res = await actor.api_get_my_profile()

    if ('Ok' in res) {
      return { success: true, data: res.Ok }
    } else {
      return { success: false, error: res.Err }
    }
  } catch (error) {
    return { success: false, error }
  }
}

export const createAccount = async (
  actor: IndexCanister,
  username: string,
  bio?: string,
  avatar?: string,
  coverImage?: string
) => {
  if (!actor) return { success: false, error: 'Missing index_canister' }
  if (!username) return { success: false, error: 'Missing username' }

  try {
    const params: UserInputArgs = {
      username,
      bio: !bio ? [] : [bio],
      avatar: !avatar ? [] : [avatar],
      cover_image: !coverImage ? [] : [coverImage]
    }

    const res = await actor.api_create_account(params)

    if ('Ok' in res) {
      return { success: true }
    } else {
      return { success: false, error: res.Err }
    }
  } catch (error) {
    return { success: false, error }
  }
}

export const updateProfile = async (
  actor: IndexCanister,
  username: string,
  bio?: string,
  avatar?: string,
  coverImage?: string
) => {
  if (!actor) return { success: false, error: 'Missing index_canister' }
  if (!username) return { success: false, error: 'Missing username' }

  try {
    const params: UserInputArgs = {
      username,
      bio: !bio ? [] : [bio],
      avatar: !avatar ? [] : [avatar],
      cover_image: !coverImage ? [] : [coverImage]
    }

    const res = await actor.api_update_profile(params)

    if ('Ok' in res) {
      return { success: true }
    } else {
      return { success: false, error: res.Err }
    }
  } catch (error) {
    return { success: false, error }
  }
}
