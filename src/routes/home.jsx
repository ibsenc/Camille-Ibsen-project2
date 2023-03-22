import HomepageHeading from "../components/HomepageHeading";
import { Link } from "react-router-dom";
import { useState } from "react";
import Title from "../components/Title";
import "./Home.css";
import Switch from "@mui/material/Switch";
import PlayButton from "../components/PlayButton";

export default function Home() {
  const [hardMode, setHardMode] = useState(false);

  const toggleHardMode = () => {
    setHardMode(!hardMode);
  };

  return (
    <div>
      <Title headerHeight='200px' textSize='60px' />
      <HomepageHeading value='Rules' />
      <HomepageHeading value='Difficulty' />
      <div className='switch-outer-container'>
        <div className={`switch-label ${hardMode ? "" : "greyed-out"}`}>
          Hard Mode
        </div>
        <div className='switch-container'>
          <Switch
            checked={hardMode}
            onChange={toggleHardMode}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
      <PlayButton
        link={`/game/${hardMode ? "hard" : "normal"}`}
        text='Start Game'
      />
    </div>
  );
}
