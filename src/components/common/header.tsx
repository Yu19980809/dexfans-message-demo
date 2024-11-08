'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

type Props = {
  label: string
}

const Header = ({ label }: Props) => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-x-2 h-14 px-2 border-b border-gray-300 dark:border-gray-700">
      <ArrowLeft
        onClick={() => router.back()}
        className="size-10 p-2 rounded-full cursor-pointer hover:bg-secondary hover:text-sky-500"
      />

      <span className="font-semibold">{label}</span>
    </div>
  )
}

export default Header
