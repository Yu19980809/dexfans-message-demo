'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logo from '../../../../public/logo.png'

const Logo = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/')}
      className="flex justify-center items-center w-14 h-14 p-4 rounded-full transition cursor-pointer hover:bg-secondary"
    >
      <Image
        src={logo}
        alt="Logo"
        width={40}
        height={40}
      />
    </div>
  )
}

export default Logo
