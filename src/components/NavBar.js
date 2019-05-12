import React from "react";
import "./NavBar.css";

const Navbar = props => {
  const allCategory = props.category;
  const threeFirstCategory = allCategory.slice(0, 4);
  const restOfCategory = allCategory.slice(4, allCategory.length);
  return (
    <div className="nav-category">
      <div>
        {threeFirstCategory.map((cat, index) => {
          return (
            <span id={cat} onClick={props.click} key={index}>
              {cat}
            </span>
          );
        })}
      </div>
      <div className="nav-bar-open-container">
        <div id="open-bar-list" onClick={props.navList}>
          <span>Plus</span> <i class="fas fa-angle-down" />
        </div>
        <div id="nav-list">
          <ul className={props.classNavList}>
            {restOfCategory.map((cat, index) => {
              return (
                <li onClick={props.click} key={index + 4} id={cat}>
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
