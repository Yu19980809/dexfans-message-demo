'use client'

import { CldImage } from 'next-cloudinary'
import { CirclePlay } from 'lucide-react'
import { differenceInMinutes, format } from 'date-fns'
import { Message } from '@prisma/client'
// import { Eye } from 'lucide-react'

import { cn } from '@/lib/utils'
import useUser from '@/store/use-user'
import usePreviewModal from '@/store/use-previee-modal'
import AvatarItem from '@/components/common/avatar'

type Props = {
  message: Partial<Message>
  lastMessageAt?: Date
}

const ConversationBoxItem = ({ message, lastMessageAt }: Props) => {
  const { currentUser } = useUser()
  const { setOpen, setType, setSrc } = usePreviewModal()

  const isOwn = message?.from?.user_id === currentUser?.user_id
  const timeDiff = differenceInMinutes(
    new Date(message.createdAt!),
    new Date(lastMessageAt!)
  )

  const onClickImage = () => {
    setOpen(true)
    setType('image')
    setSrc(message.image!)
  }

  const onClickVideo = () => {
    setOpen(true)
    setType('video')
    setSrc(message.video!)
  }

  return (
    <>
      {(!lastMessageAt || (!!lastMessageAt && timeDiff >= 5)) && (
        <div className="flex justify-center items-center gap-x-1 py-2 text-center text-sm text-muted-foreground">
          {format(new Date(message.createdAt || new Date()), 'yyyy-MM-dd HH:mm')}
        </div>
      )}

      <div className={cn('flex gap-x-3', isOwn && 'flex-row-reverse')}>
        {/* @ts-ignore */}
        <AvatarItem user={message.from!} />

        {!!message.content && (
          <div className={cn(
            'relative flex justify-center items-center max-w-[300px] px-4 py-2 rounded-md',
            isOwn ? 'bg-sky-500/50' : 'bg-gray-500/30 dark:bg-gray-500/70'
          )}>
            {/* {isOwn && message?.status === MessageStatus.SENDING && (
              <div className="absolute top-1 -left-6">
                <Loader />
              </div>
            )} */}

            {/* {isOwn && message?.status === MessageStatus.READ && (
              <div className="absolute top-1 -left-6">
                <Eye className="size-4" />
              </div>
            )} */}

            <div className={cn(
              'absolute top-4 w-0 h-0 border-8 border-transparent',
              isOwn ? '-right-4 border-l-sky-500/50' : '-left-4 border-r-gray-500/30 dark:border-r-gray-500/70'
            )} />

            <p>{message.content}</p>
          </div>
        )}

        {!!message.image && (
          <CldImage
            onClick={onClickImage}
            src={message.image}
            alt="Image"
            width={200}
            height={300}
            className="max-w-[300px] p-[1px] rounded-md bg-gray-300 dark:bg-gray-700 object-cover cursor-pointer"
          />
        )}

        {!!message.video && (
          <div
            onClick={onClickVideo}
            className="relative flex justify-center items-center p-[1px] rounded-md bg-gray-300 dark:bg-gray-700 cursor-pointer"
          >
            <video
              src={message.video}
              className="max-w-[350px] rounded-md"
            />

            <div className="absolute">
              <CirclePlay className="w-10 h-10 text-white opacity-70" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ConversationBoxItem
