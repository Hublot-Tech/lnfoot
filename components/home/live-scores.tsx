import { apiClient } from '@/app/api/api-client'
import { FixtureDto } from '@/app/api/generated/types.gen'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const LiveScoreCard: React.FC<{ fixture: FixtureDto }> = ({ fixture }) => {
  const {
    homeTeam,
    awayTeam,
    scoreFtHome,
    scoreFtAway,
    statusShortCode,
    date,
    statusDescription,
  } = fixture

  const renderScore = () => {
    if (typeof scoreFtHome === 'number' && typeof scoreFtAway === 'number') {
      return (
        <div className='text-2xl font-bold'>
          {scoreFtHome} - {scoreFtAway}
        </div>
      )
    }
    return <div className='text-lg'>VS</div>
  }

  return (
    <Card
      className={`w-full ${statusDescription === 'inPlay' ? 'animate-pulse' : ''}`}
    >
      <CardHeader className='p-4'>
        <CardTitle className='flex items-center justify-between text-sm'>
          <span>{statusShortCode}</span>
          <span className='text-gray-500'>
            {date
              ? formatDate(new Date(date), {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'TBD'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-around p-4'>
        <div className='flex flex-col items-center gap-2 text-center'>
          {homeTeam?.logoUrl && (
            <Image
              width={40}
              height={40}
              src={homeTeam.logoUrl}
              alt={homeTeam.name ?? 'Home Team'}
            />
          )}
          <span className='font-semibold'>{homeTeam?.name ?? 'Home'}</span>
        </div>
        {renderScore()}
        <div className='flex flex-col items-center gap-2 text-center'>
          {awayTeam?.logoUrl && (
            <Image
              width={40}
              height={40}
              src={awayTeam.logoUrl}
              alt={awayTeam.name ?? 'Away Team'}
            />
          )}
          <span className='font-semibold'>{awayTeam?.name ?? 'Away'}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function LiveScores() {
  const fixtures = await apiClient.fixtures.findAll()

  return (
    <section className='bg-transparent p-4 py-20 lg:px-24'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-3xl font-bold uppercase text-orange-500'>
          Scores en Direct
        </h2>
        <Link
          href='/live-scores'
          className='text-orange-500 hover:text-orange-600'
        >
          Voir plus &rarr;
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {fixtures.slice(0, 6).map(match => (
          <LiveScoreCard key={match.id} fixture={match} />
        ))}
      </div>
    </section>
  )
}
