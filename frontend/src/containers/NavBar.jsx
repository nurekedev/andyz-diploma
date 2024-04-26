import { useState, useEffect } from "react";
import MobileMenu from "../components/header/MobileMenu";
import DesktopMenu from "../components/header/DesktopMenu";

const NavBar = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize.width < 600 ? <MobileMenu /> : <DesktopMenu />;
};

export default NavBar;
