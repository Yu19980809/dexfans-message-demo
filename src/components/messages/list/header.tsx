'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Search } from 'lucide-react'

import { Hint } from '@/components/ui/hint'

type Props = {
  isNewMessage: boolean
  setIsNewMessage: React.Dispatch<boolean>
}

const ConversationListHeader = ({ isNewMessage, setIsNewMessage }: Props) => {
  const router = useRouter()

  const onBack = () => {
    if (isNewMessage) {
      setIsNewMessage(false)
    } else {
      router.back()
    }
  }

  return (
    <div className="flex justify-between items-center w-full h-14 px-2 border-b border-gray-300 dark:border-gray-700 z-20">
      <div className="flex items-center gap-x-2">
        <ArrowLeft
          onClick={onBack}
          className="size-10 p-2 rounded-full cursor-pointer hover:bg-secondary hover:text-sky-500"
        />

        <span className="font-semibold">
          {isNewMessage ? 'NEW MESSAGES' : 'MESSAGES'}
        </span>
      </div>

      {!isNewMessage && (
        <div className="flex items-center gap-x-2">
          {/* <Hint side="bottom" label="Search">
            <Search className="size-10 p-2 rounded-full cursor-pointer hover:bg-secondary hover:text-sky-500" />
          </Hint> */}

          <Hint side="bottom" label="New Message">
            <Plus
              onClick={() => setIsNewMessage(true)}
              className="size-10 p-2 rounded-full cursor-pointer hover:bg-secondary hover:text-sky-500"
            />
          </Hint>
        </div>
      )}
    </div>
  )
}

export default ConversationListHeader
