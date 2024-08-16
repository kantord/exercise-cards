import { useCardStore } from '@/app/stores';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { colorFromStringHash } from '@/lib/utils';

export default function NewCard() {
  const { addCard } = useCardStore();

  return (
    <Card
      className="w-full border-2 border-dashed border-gray-200 p-8"
      style={{ backgroundColor: colorFromStringHash('', 99, 0) }}
    >
      <div className="flex min-h-[150px] w-full items-center justify-center">
        <Button onClick={addCard}>Create a new card</Button>
      </div>
    </Card>
  );
}
