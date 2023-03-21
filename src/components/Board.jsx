import "./board.css";

export default function Board(props) {
  const boardSize = props.wordLength * 75;

  return (
    <div className='board-container'>
      <div
        className='board'
        style={{ minWidth: boardSize, maxWidth: boardSize }}
      >
        {props.rows}
      </div>
    </div>
  );
}
