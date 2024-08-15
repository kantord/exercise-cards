import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

export type Card = {
  id: string;
  title: string;
  description: string;
  learnHref?: string;
  groups: ExerciseGroupName[]
};

type CardStore = {
  cards: Card[];
  addCard: () => string;
  deleteCard: (cardId: string) => void;
  updateCard: (cardId: string, newCard: Card) => void;
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

    }),
    {
      name: 'card-storage',
    },
  ),
);



const exerciseGroups = [
    { "name": "Chest", "supergroup": "Upper Body", "type": "muscle" },
    { "name": "Back", "supergroup": "Upper Body", "type": "muscle" },
    { "name": "Shoulders", "supergroup": "Upper Body", "type": "muscle" },
    { "name": "Arms", "supergroup": "Upper Body", "type": "muscle" },
    { "name": "Abs", "supergroup": "Core", "type": "muscle" },
    { "name": "Obliques", "supergroup": "Core", "type": "muscle" },
    { "name": "Lower Back", "supergroup": "Core", "type": "muscle" },
    { "name": "Quadriceps", "supergroup": "Lower Body", "type": "muscle" },
    { "name": "Hamstrings", "supergroup": "Lower Body", "type": "muscle" },
    { "name": "Glutes", "supergroup": "Lower Body", "type": "muscle" },
    { "name": "Calves", "supergroup": "Lower Body", "type": "muscle" },
    { "name": "Upper Body Stretching", "supergroup": "Upper Body", "type": "strength" },
    { "name": "Core Stretching", "supergroup": "Core", "type": "strength" },
    { "name": "Lower Body Stretching", "supergroup": "Lower Body", "type": "strength" },
    { "name": "Cardio", "supergroup": "Cardio", "type": "cardio" }
]
type ExerciseGroupName = typeof exerciseGroups[number]["name"]
