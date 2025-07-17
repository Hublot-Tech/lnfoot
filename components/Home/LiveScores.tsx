import { apiClient } from '@/app/api/api-client'
import { FixtureDto } from '@/app/api/generated'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const LiveScore: React.FC<{ match: FixtureDto }> = ({ match }) => {
  return (
    <div
      className={`grid ${match.statusDescription === 'inPlay' ? 'animate-pulse' : ''} rounded-lg border bg-[#F1F0F0] p-4`}
    >
      <div>{match.statusShortCode}</div>
      <div className='flex justify-between font-bold'>
        <div>
          {match.homeTeam?.logoUrl && (
            <Image
              width={50}
              height={50}
              src={match.homeTeam?.logoUrl}
              alt={match.homeTeam?.name ?? ''}
            />
          )}
          {match.homeTeam?.name}
        </div>
        <div>{match.scoreEtHome ?? match.scoreHtHome ?? match.scoreFtHome}</div>
      </div>
      <div className='divider divider-end text-green-500'>
        {formatDate(new Date(match.date ?? Date.now()))}&apos;
      </div>
      <div className='flex justify-between font-bold'>
        <div>
          {match.awayTeam?.logoUrl && (
            <Image
              width={50}
              height={50}
              src={match.awayTeam?.logoUrl}
              alt={match.awayTeam?.name ?? ''}
            />
          )}
          {match.awayTeam?.name}
        </div>
        <div>{match.scoreEtAway ?? match.scoreHtAway ?? match.scoreFtAway}</div>
      </div>
    </div>
  )
}

export default async function LiveScores() {
  const fixtures = await apiClient.fixtures.findAll()
  if (!fixtures || fixtures.length === 0) return null;
  
  return (
    <section className='bg-transparent py-20 p-4 lg:px-24'>
      <span className='flex justify-between '>
        <h2 className='text-3xl uppercase text-orange-500 font-bold'>
          SCORES EN DIRECT
        </h2>
        <Link
          href='/live-scores'
          className='text-orange-500 hover:text-orange-600'
        >
          voir plus &rarr;
        </Link>
      </span>

      <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-3'>
        {fixtures.slice(0, 6).map((match, index) => (
          <LiveScore key={index} match={match} />
        ))}
      </div>
    </section>
  )
}
