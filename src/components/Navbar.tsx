"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'


const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='p-4 md:p-6 shadow-md bg-black/[0.60]'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a
          className='text-xl md:mt-0
            font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400"font-bold mb-4 md:mb-0'
          href="#">Anonymous Opinions</a>
        {
          session ? (
            <>
              <Link href={'dashboard'}>
                <span className='font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-200 to-neutral-50"font-bold mb-4 md:mb-0'>Dashboard</span>
              </Link>

              <button className='font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400"font-bold mb-4 md:mb-0' onClick={() => {
                  signOut()
                }}>Logout</button>
            </>
          ) : (
            <Link href={'/signin'}>
              <button className='font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400"font-bold mb-4 md:mb-0' >Log In</button>
            </Link>
          )
        }
      </div>
    </nav>
  )
}


export default Navbar
