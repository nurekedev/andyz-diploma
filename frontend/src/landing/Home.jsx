import HomeFooter from "./components/HomeFooter";
import HomeHeader from "./components/HomeHeader";
import HomeSecFive from "./components/HomeSecFive";
import HomeSecFour from "./components/HomeSecFour";
import HomeSecOne from "./components/HomeSecOne";
import HomeSecThree from "./components/HomeSecThree";
import HomeSecTwo from "./components/HomeSecTwo";
import "./home.css";
const Home = () => {
  return (
    <div className="home-container">
      <HomeHeader />
      <div id="sec-1">
        <HomeSecOne />
      </div>
      <div id="sec-2">
        <HomeSecTwo />
      </div>
      <div id="sec-3">
        <HomeSecThree />
      </div>
      <div id="sec-4">
        <HomeSecFour />
      </div>
      <div id="sec-5">
        <HomeSecFive />
      </div>
      <HomeFooter />
    </div>
  );
};

export default Home;
