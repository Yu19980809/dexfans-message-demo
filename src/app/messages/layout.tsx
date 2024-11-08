import Sidebar from '@/components/layout/sidebar'
import PostButton from '@/components/layout/mobile/post-button'

type Props = {
  children: React.ReactNode
}

const MessageLayout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full mx-auto">
        <Sidebar />
        <PostButton />

        <main className="w-full md:w-2/3 h-full border-x border-gray-300 dark:border-gray-700">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MessageLayout
