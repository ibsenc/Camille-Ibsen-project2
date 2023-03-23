import "./Title.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Title(props) {
  const { headerHeight, textSize, hasBackButton } = props;

  return (
    <div className='title-header' style={{ height: headerHeight }}>
      {hasBackButton && (
        <Link className='back-button' to={"/"}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </Link>
      )}
      <div className='title' style={{ fontSize: textSize }}>
        Wordle
      </div>
      {hasBackButton && <div className='space-holder'></div>}
    </div>
  );
}
