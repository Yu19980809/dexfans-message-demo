'use client'

import { usePathname } from 'next/navigation'
import { HiOutlineUser, HiUser } from 'react-icons/hi2'

import Logo from './logo'
import SidebarItem from './item'
import UserButton from './user-button'
import PostButton from './post-button'
import useUser from '@/store/use-user'
import { MobileSidebarLinks, SidebarLinks } from '@/lib/constants'

const Sidebar = () => {
  const pathname = usePathname()
  const { currentUser } = useUser()

  return (
    <>
      {/* Web */}
      <aside className="hidden md:flex flex-col justify-between items-center lg:items-start max-w-[240px] md:w-[72px] xl:w-1/4 h-full py-4 md:pr-4 xl:px-4">
        <div className="space-y-4">
          <Logo />

          {SidebarLinks.map(item => (
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              activeIcon={item.activeIcon}
              isActive={pathname === item.href}
            />
          ))}

          <SidebarItem
            label="Profile"
            href={`/users/${currentUser?.user_id}`}
            icon={HiOutlineUser}
            activeIcon={HiUser}
            isActive={pathname === '/profile'}
          />

          <div className="mt-4">
            <PostButton />
          </div>
        </div>

        <UserButton />
      </aside>

      {/* Mobile */}
      <aside className="fixed bottom-0 left-0 right-0 md:hidden flex justify-evenly items-center h-16 border-t bg-secondary z-20">
        {MobileSidebarLinks.map(item => (
          <div key={item.href}>
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              activeIcon={item.activeIcon}
              isActive={pathname === item.href}
            />
          </div>
        ))}

        <SidebarItem
          label="Profile"
          href={`/users/${currentUser?.user_id}`}
          icon={HiOutlineUser}
          activeIcon={HiUser}
          isActive={pathname.includes('/profile')}
        />
      </aside>
    </>
  )
}

export default Sidebar
