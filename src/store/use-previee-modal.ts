import { create } from 'zustand'

type Props = {
  open: boolean
  type: 'image' | 'video'
  src: string | null
  setOpen: (status: boolean) => void
  setType: (type: 'image' | 'video') => void
  setSrc: (src: string | null) => void
}

const usePreviewModal = create<Props>((set) => ({
  open: false,
  type: 'image',
  src: null,
  setOpen: status => set(state => ({ ...state, open: status })),
  setType: type => set(state => ({ ...state, type })),
  setSrc: src => set(state => ({ ...state, src }))
}))

export default usePreviewModal
