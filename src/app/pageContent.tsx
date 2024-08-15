'use client';

import { ExerciseCard } from '@/components/exercise-card';
import { Button } from '@/components/ui/button';
import { useCardStore } from './stores';

export default function HomePageContent() {
  const { cards, addCard } = useCardStore();

  return (
    <main className="flex justify-center p-8">
      <Button onClick={addCard}>Add Card</Button>
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <ExerciseCard key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}
