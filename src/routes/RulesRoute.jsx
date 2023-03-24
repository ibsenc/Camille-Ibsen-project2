import Title from "../components/Title";
import "./RulesRoute.css";

export default function RulesRoute() {
  return (
    <div className='background-container'>
      <Title
        headerHeight='180px'
        textSize='60px'
        hasBackButton={true}
        hasRules={false}
        titleText='Rules'
      />
      <div className='rules-container'>
        <div className='rules'>
          <div className='rules-title text'>Guess the word!</div>
          <p className='text bold'>Normal Mode (default)</p>
          <p className='text'>
            You have six tries to guess the six-letter word.
          </p>
          <p className='text bold'>Hard Mode</p>
          <p className='text'>
            You have five tries to guess the seven-letter word.
          </p>
          <p className='text bold'>Hints</p>
          <p className='text'>
            After submitting a word with the "Enter" key, you will receive hints
            as follows:
          </p>
          <ul className='text'>
            <li className='text'>
              The tile will turn <span className='green'>GREEN</span> if the
              letter is in the word and in the correct spot.
            </li>
            <li className='text'>
              The tile will turn <span className='yellow'>YELLOW</span> if the
              letter is in the word but in an incorrect spot.
            </li>
            <li className='text'>
              The tile will turn <span className='grey'>GREY</span> if the
              letter is not in the word.
            </li>
          </ul>
        </div>
      </div>
      <div className='example-container'>
        <div className='rules-title text'>Example</div>
        <div className='example-photo-container'>
          <img
            className='example-photo'
            src='/src/assets/resources/GameExample.png'
            width={"500px"}
          />
        </div>
      </div>
    </div>
  );
}
