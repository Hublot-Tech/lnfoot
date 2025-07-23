'use client'

import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'

export function SearchBar() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <form method='get' className='my-4 flex justify-center'>
      <label className='input flex w-full max-w-2xl items-center gap-1 border-gray-300'>
        <Input
          type='search'
          name='q'
          placeholder='Search...'
          defaultValue={query}
          className='w-full'
        />
      </label>
    </form>
  )
}
