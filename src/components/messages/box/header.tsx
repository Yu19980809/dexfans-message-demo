'use client'

import { ArrowLeft, MoreVertical } from 'lucide-react'

import useUser from '@/store/use-user'
import { Hint } from '@/components/ui/hint'
import useConversation from '@/store/use-conversation'

const ConversationBoxHeader = () => {
  const { selectedUser } = useUser()
  const { setConversationId } = useConversation()

  return (
    <div className="flex items-center gap-x-2 w-full h-14 px-2 border-b border-gray-300 dark:border-gray-700 z-20">
      <ArrowLeft
        onClick={() => setConversationId(null)}
        className="size-10 p-2 rounded-full cursor-pointer hover:bg-secondary hover:text-sky-500"
      />

      <div className="flex-1 font-semibold">
        {selectedUser?.username}
      </div>

      <Hint side="bottom" label="More">
        <MoreVertical className="size-10 p-2 rounded-full cursor-pointer hover:bg-secondary hover:text-sky-500" />
      </Hint>
    </div>
  )
}

export default ConversationBoxHeader
