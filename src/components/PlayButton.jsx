import "./PlayButton.css";

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
