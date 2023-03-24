import "./HomepageHeading.css";

export default function HomepageHeading(props) {
  return (
    <div>
      <div className='heading-container'>
        <div className='heading'>{props.value}</div>
      </div>
    </div>
  );
}
