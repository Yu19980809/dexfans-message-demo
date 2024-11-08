'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import {
  Conversation,
  Message,
  MessageStatus
} from '@prisma/client'
import {
  BookmarkCheck,
  ImageIcon,
  Video,
  X
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { socket } from '@/lib/socket'
import useUser from '@/store/use-user'
import useConversation from '@/store/use-conversation'
import AvatarItem from '@/components/common/avatar'
import { Hint } from '@/components/ui/hint'
import {
  fetchLatestMessage,
  fetchUnreadMessageCount,
  hideConversation,
} from '@/actions/conversation'

type Props = {
  conversation: Conversation
  setConversations: React.Dispatch<Conversation[]>
}

const ConversationListItem = ({ conversation, setConversations }: Props) => {
  const { currentUser, setSelectedUser } = useUser()
  const { conversationId, setConversationId } = useConversation()

  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [latestMessage, setLatestMessage] = useState<Message | null>(null)

  const isActive = conversation.id === conversationId
  const user = conversation.users.filter(item => item.user_id !== currentUser?.user_id.toString())[0]

  const onClick = async () => {
    setConversationId(conversation.id)
    setSelectedUser(user)
    setUnreadCount(0)
  }

  useEffect(() => {
    if (!currentUser) return

    const onLatestMessage = async () => {
      const messageRes = await fetchLatestMessage(conversation.id)
  
      if (messageRes.success) {
        if (messageRes.data) setLatestMessage(messageRes.data)
      } else {
        toast.error('Something went wrong')
        console.log('ERR_FETCH_LATESTED_MESSAGE', messageRes.error)
      }
    }

    onLatestMessage()

    const onNewMessage = async () => {
      if (conversation.id === conversationId || !currentUser) return 

      // Update showing latested message
      await onLatestMessage()

      // Upload unread message count
      const current = {
        user_id: currentUser.user_id.toString(),
        username: currentUser.username,
        avatar: !currentUser?.avatar?.[0] ? null : currentUser.avatar[0]
      }
      const countRes = await fetchUnreadMessageCount(conversation.id, current)

      if (countRes.success) {
        if (countRes.data) setUnreadCount(countRes.data)
      } else {
        toast.error('Something went wrong')
        console.log('ERR_FETCH_UNREAD_MESSAGE_COUNT', countRes.error)
      }
    }

    socket.on(`message-${conversation.id}:new`, onNewMessage)

    return () => {
      socket.off(`message-${conversation.id}:new`, onNewMessage)
    }
  }, [conversation.id, conversationId, currentUser])

  const onHide = async (e: any) => {
    e.stopPropagation()
    const res = await hideConversation(conversation.id)

    if (res.success) {
      // @ts-ignore
      setConversations((prev: Conversation[]) => {
        const newList= prev.filter(item => item.id !== conversation.id)
        return newList
      })

      if (conversation.id === conversationId) setConversationId(null)
    } else {
      toast.error('Something went wrong')
      console.log('ERR_HIDE_CONVERSATION', res.error)
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex items-center gap-x-3 px-2 py-4 cursor-pointer hover:bg-sky-500/10 dark:hover:bg-sky-500/30',
        isActive && 'bg-sky-500/10 dark:bg-sky-500/30'
      )}
    >
      <div className="relative">
        {/* @ts-ignore */}
        <AvatarItem user={user} />

        {unreadCount > 0 && (
          <span className="absolute -top-[1px] -right-[1px] size-4 rounded-full bg-rose-500 text-xs text-center">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{user.username}</span>

          <div className="flex items-center gap-x-1">
            {unreadCount > 0 && conversation.id !== conversationId && (
              <Hint side="bottom" label="Mark as read">
                <BookmarkCheck
                  onClick={() => console.log('mark as read')}
                  className={cn(
                    'hidden size-6 p-1 rounded-full text-muted-foreground group-hover:block hover:bg-secondary hover:text-sky-500',
                    isActive && 'block'
                  )}
                />
              </Hint>
            )}

            <Hint side="bottom" label="Remove">
              <X
                onClick={onHide}
                className={cn(
                  'hidden size-6 p-1 rounded-full text-muted-foreground group-hover:block hover:bg-secondary hover:text-sky-500',
                  isActive && 'block'
                )}
              />
            </Hint>
          </div>
        </div>

        {latestMessage && (
          <div className="flex justify-between items-center gap-x-2 w-full text-sm">
            <div className="w-[200px] md:w-[350px] lg:w-[200px] font-semibold text-muted-foreground truncate">
              {latestMessage.image && (
                <div className="flex items-center gap-x-2">
                  <ImageIcon className="size-4" />
                  <span>image</span>
                </div>
              )}

              {latestMessage.video && (
                <div className="flex items-center gap-x-2">
                  <Video className="size-4" />
                  <span>video</span>
                </div>
              )}

              {latestMessage.content && <span>{latestMessage.content}</span>}
            </div>

            <span className={cn(
              'text-xs text-muted-foreground',
              latestMessage.status !== MessageStatus.READ && 'text-sky-500'
            )}>
              {format(new Date(latestMessage.createdAt), 'HH:mm')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationListItem
