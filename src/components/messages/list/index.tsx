'use client'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Conversation, User } from '@prisma/client'

import { cn } from '@/lib/utils'
import { socket } from '@/lib/socket'
import { users as userList } from '@/lib/constants'
import useUser from '@/store/use-user'
import useConversation from '@/store/use-conversation'
import Loader from '@/components/common/loader'
import UserListItem from './user-item'
import UserSearchBar from './user-search'
import ConversationListHeader from './header'
import ConversationListItem from './conversation-item'
import { fetchConversations } from '@/actions/conversation'

const ConversationList = () => {
  const { currentUser } = useUser()
  const { conversationId } = useConversation()

  const [users, setUsers] = useState<User[]>([])
  const [userData, setUserData] = useState<User[]>([])
  const [searchedUsers, setSearchedUsers] = useState<User[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false)

  useEffect(() => {
    if (!currentUser?.user_id) return

    const fetchData = async () => {
      setIsLoading(true)
      const res = await fetchConversations(currentUser.user_id.toString())
      setIsLoading(false)

      if (res.success) {
        if (res.data) setConversations(res.data)
      } else {
        setIsError(true)
        toast.error('Somthing went wrong')
        console.log('ERR_FETCH_CONVERSATIONS', res.error)
      }

      // fetch(`http://localhost:3000/api/conversations?id=${currentUser?.user_id}`)
      //   .then(async (res) => {
      //     const data = await res.json()
      //     setConversations(data)
      //   })
      //   .catch(error => {
      //     setIsError(true)
      //     toast.error('Something went wrong')
      //     console.log('ERR_FETCH_CONVERSATIONS', error)
      //   })
      //   .finally(() => setIsLoading(false))
    }

    fetchData()

  }, [currentUser?.user_id])

  useEffect(() => {
    if (!isNewMessage || !currentUser?.user_id) return

    // TODO: fetch subscribed user lists

    const users = userList.filter(item => item.user_id !== currentUser?.user_id.toString())
    setUsers(users)
    if (!isSearch) setUserData(users)
  }, [isNewMessage, isSearch, currentUser?.user_id])

  useEffect(() => {
    if (isSearch) {
      setUserData(searchedUsers)
    } else {
      setUserData(users)
    }
  }, [isSearch, setUserData,  searchedUsers, users])

  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)

    if (socket.connected) onConnect()
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <div className={cn(
      'w-full lg:w-[350px] h-full border-r border-gray-300 dark:border-gray-700 overflow-y-auto',
      !!conversationId ? 'hidden lg:block' : 'block'
    )}>
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

      {!isLoading && !isError && !isNewMessage && (!conversations || !conversations.length) && (
        <div className="flex justify-center items-center w-full h-full text-muted-foreground">
          No conversation
        </div>
      )}

      {!isLoading && !isError && isNewMessage && (!users || !users.length) && (
        <div className="flex justify-center items-center w-full h-full text-muted-foreground">
          No users
        </div>
      )}

      {!isLoading && !isError && !isNewMessage && conversations && conversations.length !== 0 && (
        <div className="h-full">
          <ConversationListHeader
            isNewMessage={false}
            setIsNewMessage={setIsNewMessage}
          />

          <div className="space-y-1 overflow-y-auto">
            {conversations?.map((item: Conversation) => (
              <ConversationListItem
                key={item.id}
                conversation={item}
                setConversations={setConversations}
              />
            ))}
          </div>
        </div>
      )}

      {!isLoading && !isError && isNewMessage && userData && userData.length !== 0 && (
        <div className="h-full">
          <ConversationListHeader
            isNewMessage={true}
            setIsNewMessage={setIsNewMessage}
          />

          <UserSearchBar
            users={users}
            setIsSearch={setIsSearch}
            setSearchedUsers={setSearchedUsers}
          />

          <div className="space-y-1 overflow-y-auto">
            {userData?.map((item: User) => (
              <UserListItem
                key={item.user_id}
                user={item}
                setIsNewMessage={setIsNewMessage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ConversationList
