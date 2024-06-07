import logo from "../../assets/logo.png";
import { FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
const HomeFooter = () => {
  return (
    <div className="container">
      <footer className="home-footer">
        <img src={logo} alt="" />
        <p>&copy; Copyright ANDYZ CORP All rights reserved.</p>
        <ul>
          <li>
            <a href="">
              <FaTelegramPlane />
            </a>
          </li>
          <li>
            <a href="">
              <RiInstagramFill />
            </a>
          </li>
          <li>
            <a href="">
              <IoLogoWhatsapp />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default HomeFooter;
