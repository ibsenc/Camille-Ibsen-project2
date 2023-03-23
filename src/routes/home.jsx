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
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Title headerHeight='180px' textSize='60px' hasRules={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src='src/resources/gameplay.gif'
          width={"350px"}
          style={{
            borderStyle: "solid",
            borderColor: "grey",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <PlayButton
            func={function () {
              location.href = `/game/${hardMode ? "hard" : "normal"}`;
            }}
            text='Start Game'
            isStartButton={true}
          />
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
        </div>
      </div>
    </div>
  );
}
