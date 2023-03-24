import "./PlayButton.css";
import { Link } from "react-router-dom";

export default function PlayButton({ func, text, isStartButton }) {
  return (
    <div
      className={`play-button-container ${
        isStartButton ? "start-container" : ""
      }`}
    >
      <button className='play-button' onClick={func}>
        {text}
      </button>
    </div>
  );
}
