import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

export type Card = {
  id: string;
  title: string;
  description: string;
  learnHref?: string;
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
