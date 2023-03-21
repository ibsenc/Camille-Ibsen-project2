import "./keyboard.css";
import KeyBoardButton from "./KeyboardButton";

export default function KeyBoard() {
  const rowData = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  const rows = [];
  for (let i = 0; i < rowData.length; i++) {
    let row = [];
    for (let j = 0; j < rowData[i].length; j++) {
      row.push(<KeyBoardButton letter={rowData[i][j]} />);
    }
    rows.push(<div className='button-row'>{row}</div>);
  }

  return (
    <div className='keyboard-container'>
      <div className='keyboard'>{rows}</div>
    </div>
  );
}
