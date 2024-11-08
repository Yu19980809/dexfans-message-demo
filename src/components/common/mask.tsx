'use client'

import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { PostType } from '@/declarations/post_canister/post_canister.did'

type Props = {
  postType: PostType
  className?: string
}

const Mask = ({ postType, className }: Props) => {
  const router = useRouter()

  const onNavigatePurchase = (e: any) => {
    e.stopPropagation()
    router.push('/premium')
  }

  return (
    <div className={cn(
      'absolute inset-0 flex justify-center items-center w-full h-full rounded-md bg-white/20 backdrop-blur-2xl z-10',
      className
    )}>
      <span onClick={onNavigatePurchase} className="hover:underline">
        Purchase <span className="font-semibold">{Object.keys(postType)[0]}</span> membership to view
      </span>
    </div>
  )
}

export default Mask
