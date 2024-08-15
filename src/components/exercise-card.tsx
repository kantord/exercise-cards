/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Lu7G8eB48qQ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { Card as CardType, useCardStore } from '@/app/stores';
import { FocusEventHandler, SyntheticEvent, useCallback } from 'react';

type Props = {
  card: CardType;
};

const useInPlaceEditableField = (attributeName: keyof CardType, card: CardType) => {
  const { updateCard } = useCardStore();

  const updateValueCallback = useCallback(
    (newValue: string | null) => {
      if (newValue === null) {
        throw new Error('This should never happen');
      }

      updateCard(card.id, {
        ...card,
        [attributeName]: newValue,
      });
    },
    [attributeName, card, updateCard],
  );


  return {
    contentEditable: 'plaintext-only' as const,
    dangerouslySetInnerHTML: { __html: `${card[attributeName]}` },

    onBlur(event: SyntheticEvent) {
      updateValueCallback(event.currentTarget.innerHTML ?? null);
    },
  };
};

export function ExerciseCard({ card }: Props) {
  const { deleteCard, updateCard } = useCardStore();
  const handleDeleteCard = useCallback(() => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
    }
  }, [card.id, deleteCard]);

  const editableTitle = useInPlaceEditableField('title', card);
  const editableDescription = useInPlaceEditableField('description', card);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-wrap gap-2">
        <div>Upper Body</div>
        <div>Strength</div>
        <div>Beginner</div>
        <div>Core</div>
        <div>Cardio</div>
      </CardContent>
      <CardHeader>
        <CardTitle {...editableTitle} />
        <CardDescription {...editableDescription} />
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <Link href="#" target="_blank" className="text-primary hover:underline" prefetch={false}>
          Learn
        </Link>
        <div className="flex gap-4">
          <Button className="px-6 py-2">Done</Button>
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
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
