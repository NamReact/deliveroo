import React from "react";

const Popup = props => {
  return (
    <div className="popupMenu">
      <div className="popup-inside-container">
        <div>
          <img
            style={{ display: props.img ? "block" : "none" }}
            src={props.img}
            alt={props.title}
          />
        </div>
        <h3>{props.title}</h3>
        <div className="description-popup">{props.menuDescription}</div>
        <div className="popup-count">
          <div className="popup-button" onClick={props.remove}>
            -
          </div>
          <span>{props.quantity}</span>
          <div className="popup-button" onClick={props.add}>
            +
          </div>
        </div>
        <div className="checkout-popup">
          <div className="cancel" onClick={props.cancel}>
            Annuler
          </div>
          <div className="total" onClick={props.click}>
            {"Total " + props.price + " €"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
