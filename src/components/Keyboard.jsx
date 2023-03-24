import "./keyboard.css";
import KeyBoardButton from "./KeyboardButton";

export default function KeyBoard({ onButtonClick }) {
  const rowData = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  const rows = [];
  for (let i = 0; i < rowData.length; i++) {
    let row = [];
    for (let j = 0; j < rowData[i].length; j++) {
      row.push(
        <KeyBoardButton
          buttonText={rowData[i][j]}
          onButtonClick={onButtonClick}
          key={`button-${i}-${j}`}
        />
      );
    }
    rows.push(
      <div className='button-row' key={`button-row-${i}`}>
        {row}
      </div>
    );
  }

  return (
    <div className='keyboard-container'>
      <div className='keyboard'>{rows}</div>
    </div>
  );
}
