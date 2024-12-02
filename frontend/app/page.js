'use client'

import Main from "@/components/Main";
import MostRatedWeek from "@/components/MostRatedWeek";
import ExploreGenre from "@/components/ExploreGenre";
import AllTimeLeaders from "@/components/AllTimeLeaders";

export default function Home() {
  return (
    <div className="py-2 md:py-5">
      
      <Main />
      <MostRatedWeek />
      <ExploreGenre />
      <AllTimeLeaders />
    </div>
  );
}
