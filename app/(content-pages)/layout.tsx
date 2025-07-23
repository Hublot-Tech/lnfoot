'use client'

import { SearchBar } from '@/components/common/search-bar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, Suspense, useEffect, useState } from 'react'

export default function ContentPagesLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const titleFromPath = pathname.split('/').filter(Boolean)
  const [title, setTitle] = useState('')
  
  useEffect(() => {
    setTitle(document.title ?? '')
  }, [])

  return (
    <section className='flex items-center py-8'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        {/* Breadcrumb */}
        <nav className='mb-6 text-sm'>
          <ul className='flex items-center cursor-pointer space-x-1'>
            <li>
              <Link href='/' className='text-blue-600 hover:text-blue-800'>
                Acceuil
              </Link>
            </li>
            {titleFromPath.map((segment, index) => (
              <li key={index} className='flex items-center gap-1'>
                <ChevronRight className='h-4' />
                <Link
                  href={`/${titleFromPath.slice(0, index + 1).join('/')}`}
                  className='text-blue-600 hover:text-blue-800'
                >
                  {index === titleFromPath.length - 1
                    ? title || segment
                    : segment}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        {titleFromPath.length < 2 && (
          <Suspense>
            <SearchBar />
          </Suspense>
        )}

        {/* Page content */}
        {children}
      </div>
    </section>
  )
}
