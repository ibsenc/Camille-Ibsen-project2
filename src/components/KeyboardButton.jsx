import "./KeyboardButton.css";

export default function KeyBoardButton(props) {
  const letter = props.letter;

  return (
    <div
      className='button'
      onClick={() => {
        console.log(letter);
      }}
    >
      <div className='button-text'>{letter.toUpperCase()}</div>
    </div>
  );
}
