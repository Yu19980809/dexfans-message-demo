'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Message, MessageStatus } from '@prisma/client'
import { CirclePlay, FileVideo, ImageIcon, Smile, Trash2 } from 'lucide-react'

import { socket } from '@/lib/socket'
import useUser from '@/store/use-user'
import useConversation from '@/store/use-conversation'
import { sendMessage } from '@/actions/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/loader'
import Emoji from '@/components/common/emoji'
import MediaUploader from '@/components/common/media-uploader'

type Props = {
  setMessages: React.Dispatch<Partial<Message>[]>
}

const ConversationBoxInput = ({ setMessages }: Props) => {
  const { currentUser, selectedUser } = useUser()
  const { conversationId } = useConversation()

  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSendMessage = async (type: string, value: string) => {
    if (type === 'text' && !value.trim() || !currentUser) return

    const current = {
      user_id: currentUser.user_id.toString(),
      username: currentUser.username,
      avatar: !currentUser?.avatar?.[0] ? null : currentUser.avatar[0]
    }
    const data: Partial<Message> = {
      from: current,
      to: selectedUser!,
      conversationId: conversationId!,
      content: type === 'text' ? value.trim() : null,
      image: type === 'image' ? value : null,
      video: type === 'video' ? value : null
    }

    setIsLoading(true)
    setMessage('')
    // @ts-ignore
    setMessages((prev: Partial<Message>[]) => {
      const newMessage = {
        ...data,
        status: MessageStatus.SENDING,
        createdAt: new Date()
      }

      return [...prev, newMessage]
    })
    const res = await sendMessage(data)

    setIsLoading(false)
    if (res.success) {
      socket.emit('message:new', conversationId)
    } else {
      console.log('ERR_SEND_MESSAGE', res.error)
      toast.error('Something went wrong')
      setMessage(data.content!)
    }
  }

  const onKeyDown = (e: any) => {
    // shift + enter => new line
    // enter => send message
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      onSendMessage('text', message)
    }
  }

  const onUploadSuccess = (result: any) => {
    const type = result?.info?.resource_type
    const src = type === 'video' ? result?.info?.secure_url : result?.info?.public_id

    onSendMessage(type, src)
  }

  return (
    <div className="flex flex-col h-32 border-t border-gray-300 dark:border-gray-700">
      <Textarea
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => onKeyDown(e)}
        value={message}
        disabled={isLoading}
        placeholder="Type a message..."
        className="border-none text-lg resize-none overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="flex justify-between items-cneter px-3">
        <div className="flex items-center gap-x-2">
          <MediaUploader onUploadSuccess={onUploadSuccess}>
            <ImageIcon className="size-10 p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-secondary hover:text-sky-500" />
          </MediaUploader>

          <MediaUploader isVideo onUploadSuccess={onUploadSuccess}>
            <FileVideo className="size-10 p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-secondary hover:text-sky-500" />
          </MediaUploader>

          <Emoji onChange={emoji => setMessage(prev => prev + emoji)}>
            <Smile className="size-10 p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-secondary hover:text-sky-500" />
          </Emoji>
        </div>

        <Button
          onClick={() => onSendMessage('text', message)}
          disabled={isLoading || !message.trim()}
          className="rounded-full bg-sky-500 hover:bg-sky-500/90 text-white"
        >
          {isLoading ? <Loader /> : 'Send'}
        </Button>
      </div>
    </div>
  )
}

export default ConversationBoxInput
