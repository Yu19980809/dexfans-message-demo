'use client'

import Link from 'next/link'
import { GripHorizontal, LogOut } from 'lucide-react'

import { userOptions } from '@/lib/constants'
import useUser from '@/store/use-user'
import { useAuth } from '@/components/providers/auth'
import AvatarItem from '@/components/common/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'


const UserButton = () => {
  const { logout } = useAuth()
  const { currentUser } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <div className="flex xl:hidden justify-center items-center w-14 h-14 p-4 rounded-full cursor-pointer hover:bg-secondary">
            <AvatarItem user={currentUser!} />
          </div>

          <div className="hidden xl:flex justify-between items-center w-14 xl:w-[200px] h-14 p-4 rounded-full text-sm truncate cursor-pointer hover:bg-secondary">
            <div className="flex items-center gap-x-2">
              <AvatarItem user={currentUser!} />
              <span className="font-semibold">{currentUser?.username}</span>
            </div>

            <GripHorizontal className="w-4 h-4" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50">
        <div className="flex flex-col gap-y-2">
          {userOptions.map(item => (
            <Link key={item.href} href={item.href}>
              <DropdownMenuItem>
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
