import brain from "../../assets/brain.png";
const HomeSecOne = () => {
  return (
    <div className="home-1" id="section1">
      <div className="home-1-content">
        <div className="home-1-text">
          <h1>Andyz</h1>
          <p>
            An innovative platform for providing digital health services and
            managing patient health.
          </p>
        </div>
        <div className="home-1-img">
          <img src={brain} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeSecOne;
