interface FooterProps {
  startGame: () => void;
  countdown: number;
  allowBet: boolean;
  balance: number;
  reBet: () => void;
}

function Footer(props: FooterProps) {
  return (
    <div className="footer">
      <div className="game-actions">
        <span>Timer: {props.countdown}</span>
        <button
          className={"primary game"}
          disabled={props.allowBet}
          onClick={() => props.startGame()}
        >
          Start
        </button>
        <button
          className={"game"}
          disabled={props.allowBet}
          onClick={() => props.reBet()}
        >
          Re-Bet
        </button>
        <h4>Balance: {props.balance}</h4>
      </div>
    </div>
  );
}

export default Footer;
