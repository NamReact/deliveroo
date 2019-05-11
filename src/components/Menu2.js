import React from "react";

const Menu2 = props => {
  return (
    <div className="menu-container" onClick={props.click} id={props.id}>
      <div>
        <h4>{props.menu}</h4>
        <div className="description">{props.menuDescription}</div>
        <div className="price">{props.price + "€"}</div>
      </div>
    </div>
  );
};

export default Menu2;
