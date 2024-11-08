import { Membership } from '@/declarations/index_canister/index_canister.did'

export enum EMemberShip {
  GUEST = 'Guest',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export enum ESubscribeType {
  SUBSCRIBING,
  SUBSCRIBER,
  SIDEBAR
}

export enum EPostListType {
  FOR_YOU,
  SUBSCRIBING,
  USER_PROFILE
}

export enum EPostType {
  FREE = 'Free',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum',
  PAID = 'Paid'
}

export enum EPremiumType {
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum',
}

export type TPremium = {
  label: string
  value: Membership
  price: number
  items: string[]
}

// export type TUser = {
//   user_id: string
//   active_post_canister: string
//   all_post_canisters: string[]
//   username: string
//   bio: string | null
//   avatar: string | null
//   asset_canister_id: string
//   cover_image: string | null
//   subscribers: string[]
//   subscribing: string[]
//   posts: string[]
//   likes: string[]
//   collects: string[]
//   is_bot: boolean
//   membership: EMemberShip
//   created_at: Date
// }
