import { Card, useCardStore } from '@/app/stores';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { useCallback } from 'react';

type Props = {
  card: Card;
};

export default function ActionsMenu({ card }: Props) {
  const { deleteCard } = useCardStore();
  const handleDeleteCard = useCallback(() => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
    }
  }, [card.id, deleteCard]);

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
