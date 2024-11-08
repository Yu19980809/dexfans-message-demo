'use client'

import { usePathname, useRouter } from 'next/navigation'
import { GiFeather } from 'react-icons/gi'

import { cn } from '@/lib/utils'

const MobilePostButton = () => {
  const router = useRouter()
  const path = usePathname()

  const isHome = path === '/'

  return (
    <div
      onClick={() => router.push('/editor')}
      className={cn(
        'fixed right-6 bottom-20 p-4 rounded-full bg-sky-500 cursor-pointer z-20',
        isHome ? 'md:hidden block' : 'hidden'
      )}
    >
      <GiFeather size={20} color="white" />
    </div>
  )
}

export default MobilePostButton
