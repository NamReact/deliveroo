import React from "react";

const Menu = props => {
  return (
    <div className="menu-container" onClick={props.click} id={props.id}>
      <div>
        <h4>{props.menu}</h4>
        <div className="description">{props.menuDescription}</div>
        <div className="price">{props.price + "€"}</div>
      </div>

      <img
        style={{ display: props.menuImg ? "block" : "none" }}
        src={props.menuImg}
        alt={props.menu}
      />
    </div>
  );
};

export default Menu;
