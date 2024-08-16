'use client';

import { Button } from '@/components/ui/button';
import { useCardStore } from './stores';
import { useMemo } from 'react';
import { sortBy } from 'lodash';
import { ExerciseCard } from '@/components/organisms/exercise-card';

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
