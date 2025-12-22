import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { LayoutDashboard, PenBox } from 'lucide-react'

const Header = () => {
  return (
    <header className="fixed top-0 w-full h-16 px-4 border-b border-slate-200 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tight">
          CareerPilot
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
                <Button variant="outline" className="hidden md:flex">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
            </Link>
             <Link href="/create">
                <Button className="hidden md:flex bg-indigo-600 hover:bg-indigo-700 text-white">
                  <PenBox className="h-4 w-4" />
                  Create
                </Button>
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton>
               <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header