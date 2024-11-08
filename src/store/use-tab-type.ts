import { create } from 'zustand'

type Props = {
  isSubscribing: boolean
  setIsSubscribing: (status: boolean) => void
}

const useTabType = create<Props>((set) => ({
  isSubscribing: false,
  setIsSubscribing: status => set({ isSubscribing: status })
}))

export default useTabType
