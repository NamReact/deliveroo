import React from "react";

class Quantity extends React.Component {
  state = {
    quantity: this.props.quantity
  };

  remove = () => {
    let newQuantity = this.state.quantity;
    newQuantity = newQuantity - 1;
    this.setState({ quantity: newQuantity });
  };

  add = () => {
    let newQuantity = this.state.quantity;
    newQuantity = newQuantity + 1;
    this.setState({ quantity: newQuantity });
  };

  render() {
    return (
      <div className="basket-quantity">
        <button onClick={this.remove}>-</button>
        <div>{this.state.quantity}</div>
        <button onClick={this.add}>+</button>
        <div>{this.props.title}</div>
        <div>{this.props.price}</div>
      </div>
    );
  }
}

export default Quantity;
