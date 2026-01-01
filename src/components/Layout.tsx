import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen py-4 px-4 md:py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
            African Time Tracker
          </h1>
          <p className="text-center text-sand mt-2 text-sm md:text-base">
            Track your advisory & board work across companies
          </p>
        </header>
        <main className="space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
