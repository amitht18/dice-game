import create from "zustand";
import { devtools } from "zustand/middleware";

import { GameState, Dice } from "./types";

export const useGameStore = create<GameState>()(
    devtools((set) => ({
        numberOfDices: 6,
        dices: new Array(6).fill({}).map((item, index) => {
            return { label: `Dice ${index + 1}`, value: 0 };
        }),
        balance: 100,
        increaseBet: (by, at) => {
            set((state) => ({
                ...state,
                balance: state.balance - 1,
                dices: state.dices.map((dice, index) => {
                    if (at === index) {
                        return { ...dice, value: dice.value + by };
                    }
                    return dice;
                })
            }));
        },
        decreaseBalance: (by) => {
            set((state) => ({
                ...state,
                balance: state.balance - by
            }));
        },
        increaseBalance: (by) => {
            set((state) => ({
                ...state,
                balance: state.balance + by
            }));
        },
        resetGame: () => {
            set((state) => ({
                ...state,
                numberOfDices: 6,
                dices: new Array(6).fill({}).map((item, index) => {
                    return { label: `Dice ${index + 1}`, value: 0 };
                }),
                balance: 100
            }));
        },
        resetDices: () => {
            set((state) => ({
                ...state,
                dices: new Array(6).fill({}).map((item, index) => {
                    return { label: `Dice ${index + 1}`, value: 0 };
                })
            }));
        }
    }))
);
