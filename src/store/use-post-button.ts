import { create } from 'zustand'

type Props = {
  focus: boolean
  setFocus: (status: boolean) => void
}

const usePostButton = create<Props>((set) => ({
  focus: false,
  setFocus: status => set(() => ({ focus: status }))
}))

export default usePostButton
