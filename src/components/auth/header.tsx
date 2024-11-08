'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/providers/auth'
import { Button } from '@/components/ui/button'
import logo from '../../../public/logo.png'

const AuthHeader = () => {
  const router = useRouter()
  const { isAuth, identity, login } = useAuth()

  if (isAuth && identity) router.push('/')

  return (
    <div className="flex justify-between items-center h-20 px-8">
      <div className="flex items-center gap-x-2">
        <Image
          src={logo}
          alt="Logo"
          className="w-8 h-8 rounded-md"
        />

        <span className="font-semibold text-xl gradient-color">DEXFANS</span>
      </div>

      <Button
        onClick={() => login()}
        variant="outline"
      >
        Log in
      </Button>
    </div>
  )
}

export default AuthHeader
