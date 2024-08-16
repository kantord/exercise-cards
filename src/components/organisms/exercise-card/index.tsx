import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Card as CardType, useAnalyzedCard, useCardStore } from '@/app/stores';
import { SyntheticEvent, useCallback } from 'react';

import ExerciseGroupEditor from './exercise-group-editor';
import { colorFromStringHash } from '@/lib/utils';
import ActionsMenu from './actions-menu';

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
  const { practiceCard } = useCardStore();
  const { isDone } = useAnalyzedCard(card);
  const editableTitle = useInPlaceEditableField('title', card);
  const editableDescription = useInPlaceEditableField('description', card);
  const strikeThroughWhenDone = isDone
    ? {
        className: 'line-through',
      }
    : {};

  return (
    <Card
      className="min-w-md w-full max-w-xl"
      style={{ backgroundColor: colorFromStringHash(card.id, isDone ? 98 : 95, isDone ? 50 : 80) }}
    >
      <CardHeader>
        <CardTitle {...strikeThroughWhenDone} {...editableTitle} />
        <CardDescription {...strikeThroughWhenDone} {...editableDescription} />
      </CardHeader>
      <CardContent>
        <ExerciseGroupEditor card={card} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div />
        <div className="flex gap-4">
          <Button className="px-6 py-2" onClick={() => practiceCard(card.id)} disabled={isDone}>
            Done
          </Button>
          <ActionsMenu card={card} />
        </div>
      </CardFooter>
    </Card>
  );
}
