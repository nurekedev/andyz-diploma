import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const HomeHeader = () => {
 

  return (
    <div className="home-header-container">
      <header>
        <img src={logo} alt="Logo" />
        <div className="navbar">
          <ul className="navbar-list">
            <li>
              <a href="#sec-1">MAIN</a>
            </li>
            <li>
              <a href="#sec-2">Pros</a>
            </li>
            <li>
              <a href="#sec-3">STROKE IN KZ</a>
            </li>
            <li>
              <a href="#sec-4">About</a>
            </li>
            <li>
              <a href="#sec-5">Contact</a>
            </li>
          </ul>
          <Link to="/auth">
            <p>Sign in</p>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default HomeHeader;
