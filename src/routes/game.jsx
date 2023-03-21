import Title from "../components/Title";
import Board from "../components/Board";
import Tile from "../components/Tile";
import KeyBoard from "../components/Keyboard";

import "./game.css";

export default function Game(props) {
  const { wordLength, tries } = props;

  const rows = [];
  for (let i = 0; i < tries * wordLength; i++) {
    rows.push(<Tile />);
  }

  return (
    <div>
      <Title />
      <Board rows={rows} wordLength={wordLength} />
      <KeyBoard />
    </div>
  );
}
