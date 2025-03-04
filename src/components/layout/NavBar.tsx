import { useState, useEffect } from "react";
import { HamBtnIcon } from "../layout/Nav";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="NavWrapper">
      <ul className="NavUl">
        {isMobile && (
          <div className="NavHamBtn">
            <HamBtnIcon size={24} />
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
