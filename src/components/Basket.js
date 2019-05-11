import React from "react";

const Basket = props => {
  return (
    <div className={props.class} id={props.id}>
      <div className="validate-basket">Valider mon panier</div>
      <div className="basket">Votre panier est vide</div>
      <div className="tota-basketl">{props.totalBasket}</div>
    </div>
  );
};

export default Basket;
