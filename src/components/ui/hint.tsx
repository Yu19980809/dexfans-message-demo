'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type Props = {
  label: string
  children: React.ReactNode,
  side?: 'top' | 'right' | 'bottom' | 'left',
  align?: 'start' | 'center' | 'end'
}

export const Hint = ({
  label,
  children,
  side = 'top',
  align = 'center'
}: Props) => (
  <TooltipProvider>
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>

      <TooltipContent
        side={side}
        align={align}
        className="max-w-[250px] m-3 bg-secondary"
      >
        <p className="font-medium text-xs">
          {label}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
