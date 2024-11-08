'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

import useUser from '@/store/use-user'
import useActor from '@/store/use-actor'
import { getMyProfile } from '@/actions/account'
import { ERROR_ACCOUNT_NOT_REGISTERED } from '@/lib/constants'
import EditProfileModal from '@/components/modals/edit-profile-modal'
import { useAuth } from '@/components/providers/auth'
import {
  canisterId as indexCanisterId,
  createActor as createIndexCanister
} from '@/declarations/index_canister'
import {
  canisterId as postCanisterId,
  createActor as createPostCanister
} from '@/declarations/post_canister'


type Props = {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  const { isAuth, identity,  setIsAuth } = useAuth()
  if (!isAuth) redirect('/login')

  const { indexCanister, setIndexCanister, setPostCanister } = useActor()
  const { setCurrentUser } = useUser()

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuth || !identity) return

    const indexCanister = createIndexCanister(indexCanisterId, {
      agentOptions: {
        identity
      }
    })
    const postCanister = createPostCanister(postCanisterId, {
      agentOptions: {
        identity
      }
    })

    setPostCanister(postCanister)
    setIndexCanister(indexCanister)
  }, [
    isAuth,
    identity,
    setIndexCanister,
    setPostCanister
  ])

  useEffect(() => {
    if (!indexCanister) return 

    const fetchData = async () => {
      setIsLoading(true)
      const res = await getMyProfile(indexCanister)

      if (res.success) {
        // Save user profile
        setCurrentUser(res.data!)
      } else if (res.error === ERROR_ACCOUNT_NOT_REGISTERED) {
        // Show profile modal to create account
        setOpen(true)
      } else {
        console.log('ERR_GET_MY_PROFILE', res.error)
        toast.error('Something went wrong')
        setIsAuth(false)
        redirect('/login')
      }

      setIsLoading(false)
    }

    fetchData()
  }, [indexCanister, setIsAuth, setCurrentUser])

  return (
    <div className="h-screen">
      <EditProfileModal open={open} type="create" setOpen={setOpen} />

      {children}
    </div>
  )
}

export default RootLayout

