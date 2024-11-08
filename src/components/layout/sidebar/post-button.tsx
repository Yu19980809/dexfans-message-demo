'use client'

import { GiFeather } from 'react-icons/gi'

import usePostButton from '@/store/use-post-button'
import { Hint } from '@/components/ui/hint'

const PostButton = () => {
  const { setFocus } = usePostButton()

  return (
    <div onClick={() => setFocus(true)}>
      <div className="xl:hidden justify-center items-center p-4 rounded-full bg-sky-500 cursor-pointer transition hover:bg-opacity-80">
        <Hint side="bottom" label="Post">
          <GiFeather size={20} color="white" />
        </Hint>
      </div>

      <div className="hidden xl:block w-full py-2 rounded-full bg-sky-500 cursor-pointer transition hover:opacity-80">
        <p className="font-semibold text-center text-[20px] text-white">
          Post
        </p>
      </div>
    </div>
  )
}

export default PostButton
