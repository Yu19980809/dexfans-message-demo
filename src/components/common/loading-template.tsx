import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  size?: number
}

const LoadingTemplate = ({ size = 4 }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader2 className={cn('size-4 animate-spin', !!size && `size-${size}`)} />
    </div>
  )
}

export default LoadingTemplate
