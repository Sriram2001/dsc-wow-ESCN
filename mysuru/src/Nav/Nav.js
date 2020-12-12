import React, { useEffect, useRef, useState } from "react";
import BigNav from "./NavBig";
import SmallNav from "./SmallNav";
import "./Nav.css";

const Nav = (props) => {
  let initialValue;
  const mobileBreakPoint = 768;
  if (window.innerWidth < mobileBreakPoint) {
    initialValue = true;
  } else {
    initialValue = false;
  }
  const [navSize, setnavSize] = useState(initialValue);
  const navRef = useRef();
  navRef.current = navSize;
  useEffect(() => {
    const handleResize = () => {
      const show = window.innerWidth < mobileBreakPoint;
      if (navRef.current !== show) {
        setnavSize(show);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return navSize ? (
    <SmallNav sticky={props.sticky} transp={props.transp} />
  ) : (
      <BigNav sticky={props.sticky} transp={props.transp} />
    );
};
export default Nav;
