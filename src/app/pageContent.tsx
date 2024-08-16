'use client';

import { useCardStore } from './stores';
import { useMemo, useRef } from 'react';
import { sortBy } from 'lodash';
import { ExerciseCard } from '@/components/organisms/exercise-card';
import NewCard from '@/components/organisms/new-card';

export default function HomePageContent() {
  const { cards } = useCardStore();
  const sortedCards = useMemo(() => {
    return sortBy(cards, (card) => card.id);
  }, [cards]);
  const ref = useRef<Record<string, HTMLElement>>({});

  return (
    <main className="flex flex-col justify-center p-8">
      <div className="mx-auto flex w-full max-w-[800px] flex-row flex-wrap justify-center gap-4">
        {sortedCards.map((card) => (
          <div
            tabIndex={0}
            className="w-full rounded focus-within:outline"
            key={card.id}
            ref={(element) => {
              if (element) {
                ref.current[card.id] = element;
              } else {
                delete ref.current[card.id];
              }
            }}
          >
            <ExerciseCard card={card} />
          </div>
        ))}
        <NewCard references={ref} />
      </div>
    </main>
  );
}
