import sec4 from "../../assets/sec4.png";
import iitu from "../../assets/iitu.png";
const HomeSecFour = () => {
  return (
    <div className="sec-4">
      <div className="container">
        <div className="left-1">
          <div className="left-card">
            <img src={iitu} alt="" />
            <h1>IITU</h1>
          </div>
          <div className="left-card">
            <img src={sec4} alt="" />
            <h1>Almaty</h1>
          </div>
        </div>
        <div className="home-text">
          <p>
            <span>Andyz </span>
            is a digital health platform developed by a team of experienced
            healthcare and IT professionals. We began operations in 2024 with
            the goal of improving the health and quality of life of our users.
          </p>
          <br />
          <p>
            Our team consists of doctors, engineers, designers and data security
            experts who have joined forces to create an innovative and reliable
            product.
          </p>
          <p>
            We provide a range of services, including appointment scheduling,
            health monitoring, personalized reports and online consultations, to
            make health care accessible and convenient for everyone. Our mission
            is to provide reliable and effective solutions for the health and
            well-being of our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSecFour;
