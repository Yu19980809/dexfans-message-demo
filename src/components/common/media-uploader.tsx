'use client'

import { toast } from 'react-hot-toast'
import { CldUploadWidget } from 'next-cloudinary'

type Props = {
  isVideo?: boolean
  children?: React.ReactNode
  onUploadSuccess: (result: any) => void
}

const MediaUploader = ({
  isVideo = false,
  children,
  onUploadSuccess
}: Props) => {
  const onUploadError = () => toast.error('Something went wrong')

  return (
    <CldUploadWidget
      // uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
      uploadPreset="libra_icp_dexfans"
      options={{
        multiple: false,
        resourceType: isVideo ? 'video' : 'image'
      }}
      onSuccess={result => onUploadSuccess(result)}
      onError={onUploadError}
    >
      {({ open }) => (
        <div onClick={() => open()}>
          {children}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
