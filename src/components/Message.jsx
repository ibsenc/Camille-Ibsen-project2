import "./Message.css";

export default function Message({ error, text }) {
  return (
    <div className='message-container'>
      <div className={`message ${error ? "error" : ""} new-line`}>{text}</div>
    </div>
  );
}
