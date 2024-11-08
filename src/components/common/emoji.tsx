'use client'

import { useTheme } from 'next-themes'
import EmojiPicker, { Theme } from 'emoji-picker-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface IconPickerProps {
  onChange: (emoji: string) => void
  children: React.ReactNode
  asChild?: boolean
}

const Emoji = ({
  onChange,
  children,
  asChild
}: IconPickerProps) => {
  const themeMap = {
    'dark': Theme.DARK,
    'light': Theme.LIGHT
  }

  const {resolvedTheme} = useTheme()
  const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap
  const theme = themeMap[currentTheme]

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={data => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default Emoji
