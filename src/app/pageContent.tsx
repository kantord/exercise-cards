'use client';

import { useCardStore } from './stores';
import { useMemo } from 'react';
import { sortBy } from 'lodash';
import { ExerciseCard } from '@/components/organisms/exercise-card';
import NewCard from '@/components/organisms/new-card';

export default function HomePageContent() {
  const { cards } = useCardStore();
  const sortedCards = useMemo(() => {
    return sortBy(cards, (card) => card.id);
  }, [cards]);

  return (
    <main className="flex flex-col justify-center p-8">
      <div className="flex flex-row flex-wrap justify-center gap-4 max-w-[800px] mx-auto w-full">
        {sortedCards.map((card) => (
          <ExerciseCard key={card.id} card={card} />
        ))}
        <NewCard />
      </div>
    </main>
  );
}
