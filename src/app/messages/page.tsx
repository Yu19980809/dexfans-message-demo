import ConversationBox from '@/components/messages/box'
import ConversationList from '@/components/messages/list'

const Messages = () => {
  return (
    <div className="flex h-full">
      <ConversationList />
      <ConversationBox />
    </div>
  )
}

export default Messages
