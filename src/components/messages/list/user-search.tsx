'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type Props = {
  users: User[]
  setIsSearch: React.Dispatch<boolean>
  setSearchedUsers: React.Dispatch<User[]>
}

const UserSearchBar = ({ users, setIsSearch, setSearchedUsers }: Props) => {
  const [value, setValue] = useState<string>('')
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const onKeyDown = (e: any) => {
    if (e.which !== 13) return

    setIsSearch(true)
    if (!value.trim()) return setSearchedUsers(users)
    const filteredUsers = users.filter(item => item.username.includes(value))
    setSearchedUsers(filteredUsers)
  }

  return (
    <div className="relative flex items-center w-full h-14 bg-secondary">
      <Input
        type="text"
        placeholder="Search user"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onKeyDown={onKeyDown}
        onChange={e => setValue(e.target.value.trim())}
        className="pl-10 w-full border-none bg-secondary/60 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <Search className={cn(
        'absolute top-5 left-4 w-4 h-4 text-muted-foreground',
        isFocus && 'text-sky-500'
      )} />
    </div>
  )
}

export default UserSearchBar
