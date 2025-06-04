import React from "react";
import type { Fixtures } from "@/app/api/types";
import { apiClient } from '@/app/api/api-client';
import { formatDate } from "@/lib/utilities";
import Link from "next/link";

const matchStatusLookup: Record<
  string,
  | "scheduled"
  | "inPlay"
  | "finished"
  | "postponed"
  | "cancelled"
  | "abandoned"
  | "notPlayed"
> = {
  // Scheduled
  TBD: "scheduled",
  NS: "scheduled",

  // In Play
  "1H": "inPlay",
  HT: "inPlay",
  "2H": "inPlay",
  ET: "inPlay",
  BT: "inPlay",
  P: "inPlay",
  SUSP: "inPlay",
  INT: "inPlay",
  LIVE: "inPlay",

  // Finished
  FT: "finished",
  AET: "finished",
  PEN: "finished",

  // Postponed
  PST: "postponed",

  // Cancelled
  CANC: "cancelled",

  // Abandoned
  ABD: "abandoned",

  // Not Played
  AWD: "notPlayed",
  WO: "notPlayed",
};

export const LiveScore: React.FC<{ match: Fixtures }> = ({ match }) => {
  return (
    <div
      className={`grid ${matchStatusLookup[match.status!] === "inPlay" ? "animate-pulse" : ""} rounded-lg border bg-[#F1F0F0] p-4`}
    >
      <div>{match.status}</div>
      <div className="flex justify-between font-bold">
        <div>
          {match.team1.logo && (
            <img width={50} src={match.team1.logo} alt={match.team1.name} />
          )}
          {match.team1.name}
        </div>
        <div>{match.score1}</div>
      </div>
      <div className="divider divider-end text-green-500">
        {formatDate(new Date(match.matchDatetime))}&apos;
      </div>
      <div className="flex justify-between font-bold">
        <div>
          {match.team2.logo && (
            <img width={50} src={match.team2.logo} alt={match.team2.name} />
          )}
          {match.team2.name}
        </div>
        <div>{match.score2}</div>
      </div>
    </div>
  );
};

export default async function LiveScores() {
  const fixtures = await apiClient.fixtures.findAll();

  return (
    <section className="bg-transparent py-20 p-4 lg:px-24">

      <span className="flex justify-between ">
        <h2 className="text-3xl uppercase text-orange-500 font-bold">SCORES EN DIRECT</h2>
        <Link href="/live-scores" className="text-orange-500 hover:text-orange-600">
          voir plus &rarr;
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
        {fixtures.slice(0, 6).map((match, index) => (
          <LiveScore key={index} match={match} />
        ))}
      </div>
    </section>
  );
}
