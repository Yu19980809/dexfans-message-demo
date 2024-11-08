import { create } from 'zustand'

import { post_canister } from '@/declarations/post_canister'
import { index_canister } from '@/declarations/index_canister'

type PostCanister = typeof post_canister
type IndexCanister = typeof index_canister

type Props = {
  postCanister: PostCanister | null,
  indexCanister: IndexCanister | null,
  setPostCanister: (data: PostCanister | null) => void
  setIndexCanister: (data: IndexCanister | null) => void,
}

const useActor = create<Props>((set) => ({
  postCanister: null,
  indexCanister: null,
  setPostCanister: data => set((state) => ({ ...state, postCanister: data })),
  setIndexCanister: data => set((state) => ({ ...state, indexCanister: data })),
}))

export default useActor
