'use client'

import { useEffect, useRef, useState } from 'react'
import { Message, MessageStatus } from '@prisma/client'
import toast from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { socket } from '@/lib/socket'
import useUser from '@/store/use-user'
import useConversation from '@/store/use-conversation'
import PreviewModal from '@/components/modals/preview-modal'
import Loader from '@/components/common/loader'
import ConversationBoxHeader from './header'
import ConversationBoxInput from './input'
import ConversationBoxItem from './item'
import {
  fetchConversationMessages,
  fetchLatestMessage,
  markConversationMessagesAsRead
} from '@/actions/conversation'

const ConversationBox = () => {
  const { currentUser } = useUser()
  const { conversationId } = useConversation()
  const bottomRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Partial<Message>[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (!conversationId || !currentUser) return

    const fetchData = async () => {
      setIsLoading(true)
      const res = await fetchConversationMessages(currentUser.user_id.toString(), conversationId)
      setIsLoading(false)

      if (res.success) {
        if (!res.data) return
        const data = res.data
        const len = data.length
        if (len === 0) return setMessages([])
        if (len > 0 && data[len - 1].status === MessageStatus.READ) return setMessages(data)

        // Update all unread messages' status to READ
        socket.emit('message:update', conversationId)
      } else {
        setIsError(true)
        toast.error('Something went wrong')
        console.log('ERR_FETCH_CONVERSATION_MESSAGES', res.error)
      }

      // fetch(`http://localhost:3000/api/conversations/${conversationId}?id=${currentUser?.user_id}`)
      //   .then(async (res) => {
      //     const data = await res.json()
      //     const len = data.length
      //     if (len === 0) return setMessages([])
      //     if (len > 0 && data[len - 1].status === MessageStatus.READ) return setMessages(data)
          
      //     // Update all unread messages' status to READ
      //     socket.emit('message:update', conversationId)
      //   })
      //   .catch(error => {
      //     setIsError(true)
      //     toast.error('Something went wrong')
      //     console.log('Failed to fetch messages', error)
      //   })
      //   .finally(() => setIsLoading(false))
    }

    fetchData()
  }, [conversationId, currentUser?.user_id])

  useEffect(() => {
    if (!messages || !messages.length) return

    bottomRef?.current?.scrollIntoView()
  }, [messages])

  useEffect(() => {
    if (!conversationId) return

    const onNewMessage = async () => {
      const res = await fetchLatestMessage(conversationId)

      if (res.success) {
        const message = res.data
        if (!message) return

        setMessages(prev => {
          const len = prev.length
          if (prev[len - 1]?.status === MessageStatus.SENDING) prev.pop()
          return [...prev, message]
        })

      } else {
        setMessages(prev => {
          prev.pop()
          return prev
        })
        toast.error('Something went wrong')
        console.log('ERR_FETCH_LATEST_MESSAGE', res.error)
      }
    }

    const onUpdateMessage = async () => {
      const res = await markConversationMessagesAsRead(conversationId!)
  
      if (res.success) {
        setMessages(prev => {
          const newMessages = prev.map(item => {
            if (item.status === MessageStatus.READ) return item
  
            return {
              ...prev,
              status: MessageStatus.READ
            }
          })
  
          return newMessages
        })
      } else {
        toast.error('Something went wrong')
        console.log('ERR_MARK_CONVERSATION_MESSAGES_AS_READ', res.error)
      }
    }

    socket.on(`message-${conversationId}:new`, onNewMessage)
    socket.on(`message-${conversationId}:update`, onUpdateMessage)

    return () => {
      socket.off(`message-${conversationId}:new`, onNewMessage)
      socket.off(`message-${conversationId}:update`, onUpdateMessage)
    }
  }, [conversationId])

  return (
    <>
      <PreviewModal />

      <div className={cn(
        'hidden lg:flex flex-col flex-1 h-full pb-16 md:pb-0',
        !!conversationId && 'flex'
      )}>
        {!conversationId && (
          <div className="flex justify-center items-center w-full h-full text-muted-foreground">
            Select a user to chat
          </div>
        )}

        {!!conversationId && (
          <div className="flex flex-col h-full">
            <ConversationBoxHeader />

            <div className="flex-1 overflow-y-scroll">
              {isLoading && (
                <div className="flex justify-center items-center w-full h-full">
                  <Loader />
                </div>
              )}

              {isError && (
                <div className="flex justify-center items-center w-full h-full text-muted-foreground">
                  Something went wrong
                </div>
              )}

              {!isLoading && !isError && (!messages || !messages.length) && (
                <div className="flex justify-center items-center w-full h-full text-muted-foreground">
                  No messages
                </div>
              )}

              {!isLoading && !isError && messages && messages.length !== 0 && (
                <>
                  <div className="flex flex-col gap-y-4 p-4">
                    {messages?.map((item, index) => (
                      <ConversationBoxItem
                        key={index}
                        message={item}
                        lastMessageAt={messages[index - 1]?.createdAt}
                      />
                    ))}
                  </div>

                  <div ref={bottomRef} className="h-1 pt-12" />
                </>
              )}
            </div>

            <ConversationBoxInput setMessages={setMessages} />
          </div>
        )}
      </div>
    </>
  )
}

export default ConversationBox
