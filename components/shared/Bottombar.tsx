"use client"
import { sidebarLinks } from '@/constants'
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();  // ✅ Correct destructuring

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
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
              className={`bottombar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className='text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
