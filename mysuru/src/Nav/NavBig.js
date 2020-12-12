import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import imgUrl from "../assets/images/logo.png";

const Nav = (props) => {
  // Helper function  to combine classes
  function classList(...classes) {
    return classes.filter((item) => !!item).join(" ");
  }
  const history = useHistory();

  const imageUrl = `url(${imgUrl})`;
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;

  // Code to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > window.innerHeight - 700;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Styles to add on scroll

  let divStyle;
  if (props.transp === "false") {
    divStyle = {
      background: "white",
      color: "#AD7D52",
    };
  } else {
    divStyle = {
      transition: "0.5s ease",
      backgroundColor: navBackground ? "white" : "transparent",
      color: navBackground ? "#AD7D52" : "white",
    };
  }

  let linkStyle;
  if (props.transp === "false") {
    linkStyle = {
      color: "#AD7D52",
    };
  } else {
    linkStyle = {
      transition: "0.5s ease",
      color: navBackground ? "#AD7D52" : "white",
    };
  }

  return (
    <div
      className={classList(
        "nav",
        props.sticky === "true" && "nav-sticky",
        props.sticky === "false" && "nav-fixed"
      )}
      style={divStyle}
    >
      <div className="nav-container container">
        <div className="clubLogo">
          <span style={{ cursor: "pointer" }} className="logo" style={{ backgroundImage: imageUrl }} onClick={() => history.push("/")} />
        </div>
        <div className="links">
          <Link to="/places" style={linkStyle}>
            Places
          </Link>
          <Link to="/guide" style={linkStyle}>
            Guide
          </Link>
          <Link to="/questions" style={linkStyle}>
            Forum
          </Link>
          <Link to="/weather" style={linkStyle}>
            Weather
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
