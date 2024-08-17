"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(pathname === '/');
  }, [pathname]);

  return (
    <nav className='fixed top-0 left-0 w-full p-4 md:p-6 shadow-md bg-black/[0.60] z-20 pb-10'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <Link href="/">
          <h2 className='text-xl md:mt-0
            font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400"font-bold mb-4 md:mb-0'>
            Anonymous Opinions
          </h2>
        </Link>
        {isHome && (
          <div className='flex space-x-4'>
            {session ? (
              <>
                <Link href='/dashboard'>
                  <h2 className='font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-200 to-neutral-50"font-bold mb-4 md:mb-0'>
                    Dashboard
                  </h2>
                </Link>
                <button className='font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400"font-bold mb-4 md:mb-0' onClick={() => {
                    signOut();
                  }}>Logout</button>
              </>
            ) : (
              <Link href='/signin'>
                <h2 className='font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4 md:mb-0'>
                  Log In
                </h2>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

