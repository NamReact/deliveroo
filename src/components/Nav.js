import React from "react";
import "./Nav.css";

const Nav = props => {
  return (
    <div className="nav">
      <img className={props.class} src={props.src} alt={props.alt} />
    </div>
  );
};

export default Nav;
