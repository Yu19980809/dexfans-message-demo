import { Mail, MessageCircleMore } from 'lucide-react'

const AuthFooter = () => {
  return (
    <footer className="flex justify-between items-center h-14 px-6">
      <p className="text-center text-xs text-muted-foreground">
        &copy; 2024 CodeDreamer, Inc. All rights reserved.
      </p>

      <div className="flex items-center gap-x-4 text-muted-foreground cursor-pointer">
        <MessageCircleMore className="size-4 curcor-pointer hover:text-purple" />
        <Mail className="size-4 curcor-pointer hover:text-purple" />
      </div>
    </footer>
  )
}

export default AuthFooter
