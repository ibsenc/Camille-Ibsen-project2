import "./PlayButton.css";
import { Link } from "react-router-dom";

export default function PlayButton({ link, text }) {
  return (
    <div className='play-button-container'>
      <Link className='play-button' to={link}>
        {text}
      </Link>
    </div>
  );
}
