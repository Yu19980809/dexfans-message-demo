'use client'

import { EPostListType } from '@/lib/types'
import useTabType from '@/store/use-tab-type'

const Home = () => {
  const { isSubscribing } = useTabType()
  const type = isSubscribing ? EPostListType.SUBSCRIBING : EPostListType.FOR_YOU

  return (
    <div className="relative flex flex-col h-full pb-16 md:pb-0">
      home
    </div>
  )
}

export default Home
