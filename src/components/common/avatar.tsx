'use client'

import { useRouter } from 'next/navigation'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { UserProfile } from '@/declarations/index_canister/index_canister.did'

type Props = {
  user?: UserProfile
  isMobile?: boolean
}

const AvatarItem = ({ user, isMobile = false }: Props) => {
  const router = useRouter()

  const onClick = (e: any) => {
    e.stopPropagation()
    if (isMobile) return
    router.push(`/users/${user?.user_id}`)
  }

  return (
    <Avatar onClick={onClick} className="size-12 cursor-pointer">
      <AvatarImage src={user?.avatar.toString()} alt="Avatar"/>
      <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'DF'}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarItem
