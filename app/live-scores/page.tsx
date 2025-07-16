import Link from 'next/link'
import { apiClient } from '../api/api-client'
import { LiveScore } from '@/components/Home/live-scores'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

const pageSize = 5

export default async function LiveScoresPage(params: {
  searchParams?: Promise<{ page?: string; q?: string }>
}) {
  const searchParams = await params.searchParams

  const page = parseInt(searchParams?.page ?? '1', 10)
  const q = searchParams?.q?.toLowerCase() ?? ''

  const leagues = await apiClient.leagues.findAll()
  const fixtures = await apiClient.fixtures.findAll()

  if (!leagues) return <div>Failed to load live scores.</div>

  // Sort alphabetically
  const sortedLeagues = leagues.sort((a, b) =>
    (a.name ?? '').localeCompare(b.name ?? '')
  )
  const competitions = sortedLeagues
    .map((league) => ({
      id: league.id,
      name: league.name ?? '',
      logoUrl: league.logoUrl ?? '',
      scores: fixtures.filter((f) => f.leagueId === league.id),
    }))
    .filter((comp) => {
      const leagueMatch = comp.name.toLowerCase().includes(q)
      const teamMatch = comp.scores.some(
        (f) =>
          f.homeTeam?.name?.toLowerCase().includes(q) ??
          f.awayTeam?.name?.toLowerCase().includes(q)
      )
      return leagueMatch || teamMatch
    })

  const paginated = competitions.slice((page - 1) * pageSize, page * pageSize)

  const totalPages = Math.ceil(competitions.length / pageSize)

  return (
    <section className='flex items-center justify-center'>
      <div className='grid w-full gap-4 p-6 lg:w-1/2'>
        {/* Breadcrumb */}
        <nav className='mb-6 text-sm'>
          <ul className='flex items-center space-x-1'>
            <li>
              <Link href='/' className='text-blue-600 hover:text-blue-800'>
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className='h-4' />
            </li>
            <li className='text-gray-600'>Score en direct</li>
          </ul>
        </nav>

        {/* Search input (same as before) */}
        <form method='get' className='m-2 h-12 w-full'>
          <label className='input flex items-center gap-1 border-gray-300'>
            <svg
              className='h-[1em] opacity-50'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <g
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='2.5'
                fill='none'
                stroke='currentColor'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.3-4.3' />
              </g>
            </svg>
            <input
              type='search'
              name='q'
              placeholder='Search'
              defaultValue={searchParams?.q ?? ''}
              className='w-full'
            />
          </label>
        </form>

        {/* Desktop view: paginated and divided */}
        <div className='hidden md:block'>
          {paginated.map(({ name, logoUrl, scores }, i) => (
            <div key={i} className='mb-8'>
              <div className='mb-4 flex items-center gap-2'>
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={name}
                    fill
                    className='h-5 w-5 object-contain'
                  />
                )}
                <h3 className='text-lg font-semibold'>{name}</h3>
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {scores.map((match, index) => (
                  <LiveScore key={index} match={match} />
                ))}
              </div>
              {i !== paginated.length - 1 && (
                <div className='my-8 border-t border-base-300' />
              )}
            </div>
          ))}
          {/* Pagination Controls */}
          <div className='join flex justify-center'>
            {page > 1 && (
              <Link href={`?page=${page - 1}`} className='btn join-item'>
                « Précédent
              </Link>
            )}
            <button className='btn join-item' disabled>
              Page {page} / {totalPages}
            </button>
            {page < totalPages && (
              <Link href={`?page=${page + 1}`} className='btn join-item'>
                Suivant »
              </Link>
            )}
          </div>
        </div>

        {/* Mobile view (unchanged) */}
        <div className='bg-base-10 join join-vertical block w-full md:hidden'>
          {competitions.map(({ name, logoUrl, scores }, i) => (
            <div
              className='collapse join-item collapse-arrow border-base-300'
              key={i}
            >
              <input
                type='radio'
                name='competition'
                aria-label={name}
                defaultChecked={i === 0}
              />
              <div className='collapse-title flex items-center gap-2 font-semibold'>
                <Image
                  fill
                  src={logoUrl}
                  alt={name}
                  className='h-4 w-4'
                />
                {name}
              </div>
              <div className='collapse-content'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  {scores.map((match, index) => (
                    <LiveScore key={index} match={match} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
