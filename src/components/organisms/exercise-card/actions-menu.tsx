import { Card, useAnalyzedCard, useCardStore, ValidSetCount, validSetCounts } from '@/app/stores';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { parseInt } from 'lodash';
import { EllipsisVertical, Trash2, Undo } from 'lucide-react';
import { useCallback } from 'react';

type Props = {
  card: Card;
};

export default function ActionsMenu({ card }: Props) {
  const { deleteCard, resetProgressToday, updateCard } = useCardStore();
  const { isDone } = useAnalyzedCard(card);

  const handleDeleteCard = useCallback(() => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
    }
  }, [card.id, deleteCard]);

  const handleSetSetCount = useCallback(
    (newValue: string) => {
      const parsedValueAsNumber = parseInt(newValue);

      if (!validSetCounts.includes(parsedValueAsNumber)) {
        throw new Error('invalid set count');
      }

      const parsedValueAsValidSetCount: ValidSetCount = parsedValueAsNumber;

      updateCard(card.id, {
        ...card,
        sets: parsedValueAsValidSetCount,
      });
    },
    [card, updateCard],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Additional actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleDeleteCard}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Permanently delete</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!isDone} onClick={() => resetProgressToday(card.id)}>
          <Undo className="mr-2 h-4 w-4" />
          <span>Reset today&apos;s progres</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Daily sets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={card.sets.toString()}
          onValueChange={(newValue) => handleSetSetCount(newValue)}
        >
          {validSetCounts.map((setCount) => (
            <DropdownMenuRadioItem key={setCount} value={setCount.toString()}>
              {setCount}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
