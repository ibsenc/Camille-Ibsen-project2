import "./StartButton.css";
import { Link } from "react-router-dom";

export default function PlayAgainButton({ link, text }) {
  return (
    <div className='button-container'>
      <Link className='play-button' to={link}>
        {text}
      </Link>
    </div>
  );
}
