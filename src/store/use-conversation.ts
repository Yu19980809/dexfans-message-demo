import { create } from 'zustand'

type Props = {
  conversationId: string | null
  setConversationId: (id: string | null) => void
}

const useConversation = create<Props>((set) => ({
  conversationId: null,
  setConversationId: id => set(() => ({ conversationId: id }))
}))

export default useConversation
