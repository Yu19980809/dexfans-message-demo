'use client'

import { User } from '@prisma/client'
import toast from 'react-hot-toast'

import useUser from '@/store/use-user'
import useConversation from '@/store/use-conversation'
import AvatarItem from '@/components/common/avatar'
import {
  createConversation,
  fetchExistedConversation,
  showConversation
} from '@/actions/conversation'

type Props = {
  user: User
  setIsNewMessage: React.Dispatch<boolean>
}

const UserListItem = ({ user, setIsNewMessage }: Props) => {
  const { currentUser, setSelectedUser } = useUser()
  const { setConversationId } = useConversation()

  const onClick = async () => {
    if (!currentUser) return
    setIsNewMessage(false)
    setSelectedUser(user)

    // Check existed conversation
    const current = {
      user_id: currentUser.user_id.toString(),
      username: currentUser.username,
      avatar: !currentUser?.avatar?.[0] ? null : currentUser.avatar[0]
    }
    const existRes = await fetchExistedConversation(current, user)
    if (!existRes.success) {
      toast.error('Something went wrong')
      console.log('ERR_HAS_EXISTED_CONVERSATION', existRes.error)
      return
    }

    if (!!existRes.data) {
      // Has existed conversation => make 'show' property to true
      const showRes = await showConversation(existRes.data)

      if (showRes.success) {
        setConversationId(existRes.data)
      } else {
        toast.error('Something went wrong')
        console.log('ERR_SHOW_CONVERSATION', showRes.error)
      }
    } else {
      // No existed conversation => create new conversation
      const createRes = await createConversation(current, user)

      if (createRes.success) {
        if (!!createRes.data) setConversationId(createRes.data)
      } else {
        toast.error('Something went wrong')
        console.log('ERR_CREATE_CONVERSATION', createRes.error)
      }
    }
  }

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-x-3 px-2 py-4 cursor-pointer hover:bg-sky-500/10 dark:hover:bg-sky-500/30"
    >
      {/* @ts-ignore */}
      <AvatarItem user={user} />
      <span className="font-semibold">{user.username}</span>
    </div>
  )
}

export default UserListItem
