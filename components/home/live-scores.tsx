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
    scoreHtHome,
    scoreHtAway,
    scoreEtHome,
    scoreEtAway,
    scorePtHome,
    scorePtAway,
    goalsHome,
    goalsAway,
    statusShortCode,
    date,
    statusDescription,
    elapsed,
  } = fixture

  const renderScore = () => {
    const isLive = statusDescription === 'inPlay'
    const isFinished = ['FT', 'AET', 'PEN'].includes(statusShortCode || '')
    const isHalfTime = statusShortCode === 'HT'
    const isExtraTime = ['ET', 'BT'].includes(statusShortCode || '')
    const isPenalties = statusShortCode === 'PEN'

    // Match finished with penalties
    if (isPenalties && typeof scorePtHome === 'number' && typeof scorePtAway === 'number') {
      const finalScore = typeof scoreEtHome === 'number' && typeof scoreEtAway === 'number'
        ? { home: scoreEtHome, away: scoreEtAway }
        : { home: scoreFtHome, away: scoreFtAway }
      
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {finalScore.home} - {finalScore.away}
          </div>
          <div className='text-sm text-gray-600 font-medium'>
            ({scorePtHome} - {scorePtAway} pen)
          </div>
          <div className='text-xs text-gray-500'>FINAL</div>
        </div>
      )
    }

    // Match finished with extra time
    if (isFinished && typeof scoreEtHome === 'number' && typeof scoreEtAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {scoreEtHome} - {scoreEtAway}
          </div>
          <div className='text-sm text-gray-600 font-medium'>
            (AET)
          </div>
          <div className='text-xs text-gray-500'>FINAL</div>
        </div>
      )
    }

    // Match finished (full time)
    if (isFinished && typeof scoreFtHome === 'number' && typeof scoreFtAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {scoreFtHome} - {scoreFtAway}
          </div>
          <div className='text-xs text-gray-500'>FINAL</div>
        </div>
      )
    }

    // Live match in extra time
    if (isLive && isExtraTime && typeof scoreEtHome === 'number' && typeof scoreEtAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold text-red-500'>
            {scoreEtHome} - {scoreEtAway}
          </div>
          <div className='text-sm text-red-500 font-medium animate-pulse'>
            {elapsed}&apos; ET
          </div>
          <div className='text-xs text-gray-600'>
            (90&apos;: {scoreFtHome} - {scoreFtAway})
          </div>
        </div>
      )
    }

    // Live match (regular time) - show current goals
    if (isLive && typeof goalsHome === 'number' && typeof goalsAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold text-red-500'>
            {goalsHome} - {goalsAway}
          </div>
          <div className='text-sm text-red-500 font-medium animate-pulse'>
            {elapsed}&apos;
          </div>
          {typeof scoreHtHome === 'number' && typeof scoreHtAway === 'number' && (
            <div className='text-xs text-gray-600'>
              (HT: {scoreHtHome} - {scoreHtAway})
            </div>
          )}
        </div>
      )
    }

    // Half-time break
    if (isHalfTime && typeof scoreHtHome === 'number' && typeof scoreHtAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold text-orange-500'>
            {scoreHtHome} - {scoreHtAway}
          </div>
          <div className='text-sm text-orange-500 font-medium'>
            HALF TIME
          </div>
        </div>
      )
    }

    // Show full-time scores if available (for completed matches)
    if (typeof scoreFtHome === 'number' && typeof scoreFtAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold'>
            {scoreFtHome} - {scoreFtAway}
          </div>
          {typeof scoreHtHome === 'number' && typeof scoreHtAway === 'number' && (
            <div className='text-xs text-gray-600'>
              (HT: {scoreHtHome} - {scoreHtAway})
            </div>
          )}
        </div>
      )
    }

    // Show half-time scores if available (fallback)
    if (typeof scoreHtHome === 'number' && typeof scoreHtAway === 'number') {
      return (
        <div className='text-center'>
          <div className='text-2xl font-bold'>
            {scoreHtHome} - {scoreHtAway}
          </div>
          <div className='text-sm text-gray-600'>
            (HT)
          </div>
        </div>
      )
    }

    // Upcoming match or no scores available
    const isUpcoming = ['NS', 'TBD', 'CANC', 'PST', 'SUSP'].includes(statusShortCode || '')
    return (
      <div className='text-center'>
        <div className={`text-lg font-medium ${isUpcoming ? 'text-blue-500' : 'text-gray-500'}`}>
          VS
        </div>
        {isUpcoming && (
          <div className='text-xs text-gray-500 mt-1'>
            {statusShortCode === 'NS' ? 'À venir' : statusShortCode}
          </div>
        )}
      </div>
    )
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
      <CardContent className='flex items-center p-4'>
        <div className='flex flex-1 flex-col items-center gap-2 text-center'>
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
        <div className='flex justify-center'>
          {renderScore()}
        </div>
        <div className='flex flex-1 flex-col items-center gap-2 text-center'>
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
