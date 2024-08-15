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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { Card as CardType, useCardStore, useExerciseGroups } from '@/app/stores';
import { SyntheticEvent, useCallback } from 'react';

import { createHash } from 'crypto';

function colorFromStringHash(str: string, lightness: number): string {
  const hash = createHash('sha256').update(str).digest('hex');
  const intHash = parseInt(hash.substring(0, 8), 16);
  const hue = intHash % 360;
  const saturation = 80;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

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
  const { deleteCard, toggleGroupInCard } = useCardStore();
  const handleDeleteCard = useCallback(() => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
    }
  }, [card.id, deleteCard]);

  const editableTitle = useInPlaceEditableField('title', card);
  const editableDescription = useInPlaceEditableField('description', card);
  const exerciseGroups = useExerciseGroups();

  return (
    <Card className="max-w-xl min-w-md w-full" style={{ backgroundColor: colorFromStringHash(card.id, 95) }}>
      <CardHeader>
        <CardTitle {...editableTitle} />
        <CardDescription {...editableDescription} />
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {card.groups.sort().map((tag) => (
          <div
            className="rounded-lg px-2 py-1 text-white"
            style={{
              backgroundColor: colorFromStringHash(tag, 30),
            }}
            key={tag}
          >
            {tag}
          </div>
        ))}
      </CardContent>
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
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Muscle groups</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[200px]">
                {exerciseGroups.map(({ superGroup, items }) => (
                  <>
                    <DropdownMenuLabel>{superGroup}</DropdownMenuLabel>
                    {items.map((item) => (
                      <DropdownMenuCheckboxItem
                        key={item.name}
                        checked={card.groups.includes(item.name)}
                        onCheckedChange={() => toggleGroupInCard(card.id, item.name)}
                      >
                        {item.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
