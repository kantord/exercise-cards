import { useCardStore } from '@/app/stores';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { colorFromStringHash } from '@/lib/utils';
import { MutableRefObject, useCallback } from 'react';

type Props = {
  references: MutableRefObject<Record<string, HTMLElement>>;
};

export default function NewCard({ references }: Props) {
  const { addCard } = useCardStore();
  const handleAddCard = useCallback(() => {
    const id = addCard();
    setTimeout(() => {
      const elementToScrollTo = references.current[id];
      elementToScrollTo.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
      elementToScrollTo.focus();
    }, 0);
  }, [addCard, references]);

  return (
    <Card
      className="w-full border-2 border-dashed border-gray-200 p-8"
      style={{ backgroundColor: colorFromStringHash('', 99, 0) }}
    >
      <div className="flex min-h-[150px] w-full items-center justify-center">
        <Button onClick={handleAddCard}>Create a new card</Button>
      </div>
    </Card>
  );
}
