import "./tile.css";

export default function Tile({ data, isCurrent }) {
  const { text, color } = data;
  return (
    <div
      className={`tile-container ${isCurrent ? "is-current" : ""} ${
        color ? "tile-" + color : ""
      }`}
    >
      {text}
    </div>
  );
}
