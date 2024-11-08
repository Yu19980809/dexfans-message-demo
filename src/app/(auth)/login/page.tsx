'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useAuth } from '@/components/providers/auth'
import { Button } from '@/components/ui/button'
import logo from '../../../../public/logo.png'

const LoginPage = () => {
  const router = useRouter()
  const { isAuth, identity, login } = useAuth()

  if (isAuth && identity) router.push('/')

  return (
    // <div className="flex flex-col items-center w-1/2 pt-[150px]">
    //   <h1 className="font-bold text-6xl text-center">
    //     Decentralized online fans community. Welcome to <span className="gradient-color">Dexfans</span>.
    //   </h1>

    //   <p className="mt-6 mb-12 font-semibold text-lg text-center">
    //     Dexfans is a decentralized social media and online fans community build on Internet Computer blockchain.
    //   </p>

    //   <Button onClick={() => login()}>
    //     Join Now
    //     <ArrowRight className="size-4" />
    //   </Button>

    //   <Image
    //     src={hero}
    //     alt="Hero Image"
    //     className="w-[500px] mt-12"
    //   />
    // </div>

    <div className="flex items-center gap-x-[100px] w-full">
      <div className="flex flex-col gap-y-10">
        <Image
          src={logo}
          alt="Logo"
          className="w-[300px] h-[300px] rounded-xl"
        />

        <p className="font-semibold text-center text-4xl gradient-text-purple-blue">
          DEXFANS
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-y-6">
        <h1 className="font-bold text-7xl gradient-text-blue-purple">DECENTRAIZE</h1>
        <h2 className="font-semibold text-4xl gradient-text-blue-purple">JOIN NOW.</h2>

        <Button
          onClick={() => login()}
          className="w-[150px] mt-14 bg-gradient-to-b from-blue to-purple font-semibold text-white hover:opacity/80"
        >
          Sign in
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
