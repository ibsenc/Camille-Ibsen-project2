import "./KeyboardButton.css";
import React from "react";

export default function KeyBoardButton(props) {
  const letter = props.letter;

  return (
    <button className='button'>
      <div className='button-text'>{letter.toUpperCase()}</div>
    </button>
  );
}
