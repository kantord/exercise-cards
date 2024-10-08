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
import { Circle, CircleCheckBig } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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
  const { isDone, doneToday } = useAnalyzedCard(card);
  const editableTitle = useInPlaceEditableField('title', card);
  const editableDescription = useInPlaceEditableField('description', card);
  const strikeThroughWhenDone = isDone
    ? {
        className: 'line-through',
      }
    : {};

  return (
    <Card
      className="w-full"
      style={{ backgroundColor: colorFromStringHash(card.id, isDone ? 98 : 95, isDone ? 50 : 80) }}
    >
      <CardHeader>
        <CardTitle {...strikeThroughWhenDone} {...editableTitle} />
        <CardDescription {...strikeThroughWhenDone} {...editableDescription} />
      </CardHeader>
      <CardContent>
        <ExerciseGroupEditor card={card} />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-8">
        <div className="flex gap-1">
          {[
            ...doneToday.map(() => <CircleCheckBig key={uuidv4()} className="h-4 w-4" />),
            ...Array(card.sets - doneToday.length)
              .fill(null)
              .map(() => <Circle key={uuidv4()} className="h-4 w-4" />),
          ]}
        </div>
        <div className="flex grow gap-4">
          <div className="flex w-full justify-end">
            <div className="flex">
              <Button className="px-6 py-2" onClick={() => practiceCard(card.id)} disabled={isDone}>
                Finish Set
              </Button>
              <ActionsMenu card={card} />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
