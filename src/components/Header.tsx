interface HeaderProps {
  balance: number;
  resetGame: () => void;
  countdown: number;
}

function Header(props: HeaderProps) {
  return (
    <div className="header">
      <h3 className="logo">Dice It!</h3>
      <button onClick={() => props.resetGame()}>Reset Game</button>
    </div>
  );
}

export default Header;
