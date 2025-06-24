"use client"
import React from 'react'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs'
const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth()
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex flex-col flex-1 w-full gap-6 px-6'>
        {sidebarLinks.map((link) => {
          let linkRoute = link.route;
          if (link.route === '/profile') {
            linkRoute = `${link.route}/${userId}`;
          }

          const isActive =
            (pathname.includes(linkRoute) && linkRoute.length > 1) ||
            pathname === linkRoute;

          return (
            <Link
              href={linkRoute}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}

      </div>
      <div className='px-6'>
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <div className='flex gap-4 p-4 cursor-pointer'>
              <button>
                <Image src='/assets/logout.svg' alt='logout' width={24} height={24} />
              </button>
              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>

      </div>
    </section>
  )
}

export default LeftSidebar
