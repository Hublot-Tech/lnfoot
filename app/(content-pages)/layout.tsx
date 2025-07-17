// app/(public)/layout.tsx
'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function PublicLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''

  return (
    <section className='flex items-center py-8'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        {/* Breadcrumb */}
        <nav className='mb-6 text-sm'>
          <ul className='flex items-center space-x-1'>
            <li>
              <Link href='/' className='text-blue-600 hover:text-blue-800'>
                Acceuil
              </Link>
            </li>
            <li className='flex items-center gap-1'>
              <ChevronRight className='h-4' />
              <span className='text-gray-600'>{pathname}</span>
            </li>
          </ul>
        </nav>

        {/* Search */}
        <form method='get' className='my-4 flex justify-center'>
          <label className='input flex w-full max-w-2xl items-center gap-1 border border-gray-300'>
            <Input
              type='search'
              name='q'
              placeholder='Search...'
              defaultValue={query}
              className='w-full'
            />
          </label>
        </form>

        {/* Page content */}
        {children}
      </div>
    </section>
  )
}
