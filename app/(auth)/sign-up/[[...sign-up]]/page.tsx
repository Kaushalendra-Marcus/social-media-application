'use client'
import {
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import React from 'react'

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <SignedOut>
        <div className="w-full max-w-sm p-6 transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl">
          <div className="text-center">
            <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-white">Create Your Account</h3>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Join us to get started with your personalized experience
            </p>
            <SignUpButton mode="modal">
              <button className="w-full px-6 py-3 text-sm font-medium text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95">
                Sign Up
              </button>
            </SignUpButton>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <a href="/sign-in" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="fixed top-4 right-4 md:top-6 md:right-6">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-10 w-10 border-2 border-indigo-500 dark:border-indigo-400",
                userButtonPopoverCard: "bg-white dark:bg-gray-800 rounded-xl shadow-xl",
                userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full dark:focus:ring-indigo-400",
                userButtonOuterIdentifier: "text-gray-800 dark:text-white",
                userButtonPopoverActionButtonText: "text-gray-800 dark:text-white",
                userButtonPopoverActionButtonIcon: "text-gray-800 dark:text-white",
              }
            }}
          />
        </div>
      </SignedIn>
    </div>
  )
}

export default Signup