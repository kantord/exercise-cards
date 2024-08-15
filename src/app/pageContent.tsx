'use client';

import { ExerciseCard } from '@/components/exercise-card';
import { Button } from '@/components/ui/button';
import { useCardStore } from './stores';
import { useMemo } from 'react';
import { sortBy } from 'lodash';

export default function HomePageContent() {
  const { cards, addCard } = useCardStore();
  const sortedCards = useMemo(() => {
    return sortBy(cards, (card) => card.id);
  }, [cards]);

  return (
    <main className="flex justify-center p-8 flex-col">
      <Button onClick={addCard}>Add Card</Button>
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {sortedCards.map((card) => (
          <ExerciseCard key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}
