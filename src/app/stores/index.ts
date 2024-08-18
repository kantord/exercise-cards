import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';
import { sortBy } from 'lodash';
import { isToday } from 'date-fns';

type LogItem = {
  created: Date;
};

export const validSetCounts = [1, 2, 3, 4, 5, 6, 7];
export type ValidSetCount = (typeof validSetCounts)[number];

export type Card = {
  id: string;
  title: string;
  description: string;
  learnHref?: string;
  groups: ExerciseGroupName[];
  log: LogItem[];
  sets: ValidSetCount;
};

type CardStore = {
  cards: Card[];
  addCard: () => string;
  deleteCard: (cardId: string) => void;
  updateCard: (cardId: string, newCard: Card) => void;
  toggleGroupInCard: (cardId: string, groupName: string) => void;
  practiceCard: (cardId: string) => void;
  resetProgressToday: (cardId: string) => void;
};

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: [],

      addCard() {
        const id = uuidv4();

        set({
          cards: [
            ...get().cards,
            {
              id,
              title: 'New Card',
              description: 'Card description',
              groups: [],
              log: [],
              sets: 1,
            },
          ],
        });

        return id;
      },

      deleteCard(cardId: string) {
        set({
          cards: get().cards.filter((card) => card.id !== cardId),
        });
      },

      updateCard(cardId: string, newCard: Card) {
        set({
          cards: [...get().cards.filter((card) => card.id !== cardId), newCard],
        });
      },

      toggleGroupInCard(cardId: string, groupName: string) {
        const card = get().cards.find((card) => card.id === cardId);
        if (card === undefined) {
          throw new Error('card not found');
        }

        const newGroups = card.groups.includes(groupName)
          ? card.groups.filter((item) => item !== groupName)
          : [...card.groups, groupName];

        set({
          cards: [
            ...get().cards.filter((card) => card.id !== cardId),
            {
              ...card,
              groups: newGroups,
            },
          ],
        });
      },

      practiceCard(cardId: string) {
        const card = get().cards.find((card) => card.id === cardId);
        if (card === undefined) {
          throw new Error('card not found');
        }

        set({
          cards: [
            ...get().cards.filter((card) => card.id !== cardId),
            {
              ...card,
              log: [
                {
                  created: new Date(),
                },
                ...card.log,
              ],
            },
          ],
        });
      },

      resetProgressToday(cardId: string) {
        const card = get().cards.find((card) => card.id === cardId);
        if (card === undefined) {
          throw new Error('card not found');
        }

        set({
          cards: [
            ...get().cards.filter((card) => card.id !== cardId),
            {
              ...card,
              log: card.log.filter((item) => !isToday(item.created)),
            },
          ],
        });
      },
    }),
    {
      name: 'card-storage',
    },
  ),
);

const exerciseGroups = [
  { name: 'Chest', supergroup: 'Upper Body', type: 'muscle' },
  { name: 'Back', supergroup: 'Upper Body', type: 'muscle' },
  { name: 'Shoulders', supergroup: 'Upper Body', type: 'muscle' },
  { name: 'Arms', supergroup: 'Upper Body', type: 'muscle' },
  { name: 'Abs', supergroup: 'Core', type: 'muscle' },
  { name: 'Obliques', supergroup: 'Core', type: 'muscle' },
  { name: 'Lower Back', supergroup: 'Core', type: 'muscle' },
  { name: 'Quadriceps', supergroup: 'Lower Body', type: 'muscle' },
  { name: 'Hamstrings', supergroup: 'Lower Body', type: 'muscle' },
  { name: 'Glutes', supergroup: 'Lower Body', type: 'muscle' },
  { name: 'Calves', supergroup: 'Lower Body', type: 'muscle' },
  { name: 'Upper Body Stretching', supergroup: 'Upper Body', type: 'stretching' },
  { name: 'Core Stretching', supergroup: 'Core', type: 'stretching' },
  { name: 'Lower Body Stretching', supergroup: 'Lower Body', type: 'stretching' },
  { name: 'Cardio', supergroup: 'Cardio', type: 'cardio' },
];
type ExerciseGroup = (typeof exerciseGroups)[number];
type ExerciseGroupName = ExerciseGroup['name'];

type SortedExerciseGroups = {
  type: string;
  items: ExerciseGroup[];
}[];

export const useExerciseGroups = (): SortedExerciseGroups => {
  const types: Record<string, Set<ExerciseGroup>> = {};

  for (const group of exerciseGroups) {
    if (!(group.type in types)) {
      types[group.type] = new Set();
    }

    types[group.type].add(group);
  }

  return Object.keys(types)
    .sort()
    .map((type: string) => ({
      type,
      items: sortBy(Array.from(types[type]), (item: ExerciseGroup) => item.name),
    }));
};

export const useAnalyzedCard = (card: Card) => {
  const doneToday = card.log
    .slice(0, Math.max(...validSetCounts))
    .filter((item) => isToday(item.created));

  return {
    ...card,
    doneToday,
    isDone: doneToday.length >= card.sets,
  };
};

type ExerciseLogItem = {
  id: string
  created: Date
  card: Card
}

export const useExerciseLog = (limit: number): ExerciseLogItem[] => {
  const {cards} = useCardStore()
  const result = []

  for (const card of cards) {
    for (const logItem of card.log.slice(0, limit)) {
      result.push({
        ...logItem,
        id: `${logItem.created}-${card.id}`,
        card
      })
    }
  }

  return sortBy(result, item => item.created).slice(0, limit)
}
