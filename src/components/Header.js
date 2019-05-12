import React from "react";
import axios from "axios";
import "./Header.css";

class Header extends React.Component {
  state = {
    loading: true,
    menu: null
  };

  render() {
    if (this.state.loading === true) {
      return <div />;
    }
    const restaurant = this.state.menu.restaurant;
    return (
      <header>
        <div className="header-description">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
        </div>
        <div className={this.props.imgContainerClass}>
          <img
            className={this.props.imgClass}
            src={this.props.src}
            alt={this.props.alt}
          />
        </div>
      </header>
    );
  }

  async componentDidMount() {
    const response = await axios.get("https://deliveroo-api.now.sh/menu");
    this.setState({ menu: response.data, loading: false });
  }
}

export default Header;
