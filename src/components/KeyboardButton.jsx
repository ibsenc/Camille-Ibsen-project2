import "./KeyboardButton.css";
import React from "react";

export default function KeyBoardButton({ onButtonClick, buttonText }) {
  function buttonClick() {
    onButtonClick(buttonText);
  }

  return (
    <button className='button' onClick={buttonClick}>
      <div className='button-text'>{buttonText}</div>
    </button>
  );
}
