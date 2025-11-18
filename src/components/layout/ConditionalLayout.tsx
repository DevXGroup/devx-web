'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/common/Navbar'
import Footer from '@/common/Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEntryPage = pathname === '/'

  if (isEntryPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
