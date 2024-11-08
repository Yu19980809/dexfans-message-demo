import { create } from 'zustand'
import { User } from '@prisma/client'

import { UserProfile } from '@/declarations/index_canister/index_canister.did'

type Props = {
  currentUser: UserProfile | null
  selectedUser: User | null
  setCurrentUser: (data: UserProfile | null) => void
  setSelectedUser: (data: User | null) => void
}

const useUser = create<Props>((set) => ({
  currentUser: null,
  selectedUser: null,
  setCurrentUser: data => set((state) => ({ ...state, currentUser: data })),
  setSelectedUser: data => set((state) => ({ ...state, selectedUser: data }))
}))

export default useUser
