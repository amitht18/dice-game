export interface Dice {
  label: string;
  value: number;
}

export interface GameState {
  numberOfDices: number;
  dices: Dice[];
  balance: number;
  increaseBet: (by: number, dice: number) => void;
  decreaseBalance: (by: number) => void;
  increaseBalance: (by: number) => void;
  resetGame: () => void;
  resetDices: () => void;
}
