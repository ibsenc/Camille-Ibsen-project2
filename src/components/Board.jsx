import "./board.css";

export default function Board(props) {
  const { rows, wordLength } = props;
  const boardSize = wordLength * 75;

  return (
    <div className='board-container'>
      <div
        className='board'
        style={{ minWidth: boardSize, maxWidth: boardSize }}
      >
        {rows}
      </div>
    </div>
  );
}
