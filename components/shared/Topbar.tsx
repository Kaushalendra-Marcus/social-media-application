import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Topbar = () => {
  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <Image src='assets/logo.svg' alt='Logo Image' width={28} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>
          Marcus-Social
        </p>
      </Link>

      
      <div className='flex items-center gap-1'>
        
        <div className='block md:hidden'>
          
        </div>
        <OrganizationSwitcher
        appearance={{
          elements :{
            organizationSwitcherTrigger :
            "py-2 px-4"
          }
        }}
        />
      </div>
    </nav>
  )
}

export default Topbar
