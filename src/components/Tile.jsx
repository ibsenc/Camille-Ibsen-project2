import "./tile.css";

export default function Tile({ text, isCurrent }) {
  return (
    <div className={`tile-container ${isCurrent ? "is-current" : ""}`}>
      {text}
    </div>
  );
}
