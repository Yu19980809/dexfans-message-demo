'use client'

import { CldImage } from 'next-cloudinary'

import { cn } from '@/lib/utils'
import usePreviewModal from '@/store/use-previee-modal'

const PreviewModal = () => {
  const { open, type, src, setOpen } = usePreviewModal()

  return (
    <div
      onClick={() => setOpen(false)}
      className={cn(
        'fixed inset-0 bg-black/80 z-50',
        open ? 'block' : 'hidden'
      )}
    >
      <div className="fixed left-[50%] top-[50%] z-50 flex justify-center items-center w-full sm:max-w-[1000px] translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg sm:rounded-lg">
        {type === 'image' && src && (
          <CldImage
            onClick={(e: any) => e.stopPropagation()}
            src={src}
            alt="image"
            width={300}
            height={500}
            className="md:w-[450px] md:h-[550px] rounded-md object-contain"
          />
        )}

        {type === 'video' && src && (
          <video
            onClick={e => e.stopPropagation()}
            src={src}
            autoPlay={open}
            controls
            className="sm:w-[450px] md:w-[1000px] rounded-md"
          />
        )}
      </div>
    </div>
  )
}

export default PreviewModal
