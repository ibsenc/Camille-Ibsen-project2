import "./Title.css";

export default function Title(props) {
  const { headerHeight, textSize } = props;

  return (
    <div className='title-header' style={{ height: headerHeight }}>
      <div className='title' style={{ fontSize: textSize }}>
        Wordle
      </div>
    </div>
  );
}
