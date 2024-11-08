import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons/lib'

import { cn } from '@/lib/utils'
import { Hint } from '@/components/ui/hint'

type Props = {
  label: string
  href: string
  icon: LucideIcon | IconType
  activeIcon: LucideIcon | IconType
  isActive?: boolean
}

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
  isActive = false
}: Props) => {
  return (
    <div className="flex items-center">
      <Link
        href={href}
        className={cn(
          'flex xl:hidden justify-center items-center p-3 rounded-full cursor-pointer hover:bg-secondary',
          isActive && 'bg-secondary'
        )}
      >
        <Hint side="bottom" label={label}>
          {isActive ? (
            <ActiveIcon size={24} className="dark:text-white" />
          ) : (
            <Icon size={24} />
          )}
        </Hint>
      </Link>

      <Link
        href={href}
        className={cn(
          'hidden xl:flex items-center gap-x-3 p-3 rounded-full cursor-pointer hover:bg-secondary',
          isActive && 'bg-secondary'
        )}
      >
        {isActive ? (
          <ActiveIcon size={24} className="dark:text-white" />
        ) : (
          <Icon size={24} />
        )}

        <p className={cn('text-lg', isActive && 'font-semibold dark:text-white')}>
          {label}
        </p>
      </Link>
    </div>
  )
}

export default SidebarItem
