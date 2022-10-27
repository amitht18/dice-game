import { Dice } from "./../state/types";

interface DiceProps {
  dice: Dice;
  handleBet: (index: number) => void;
  index: number;
}

function DiceComponent(props: DiceProps) {
  return (
    <div
      onClick={() => props.handleBet(props.index)}
      id={props.dice?.label}
      className="dice"
    >
      <p className="dice-label">{props.dice?.label}</p>
      <p className="dice-value">$:{props.dice?.value}</p>
    </div>
  );
}

export default DiceComponent;
