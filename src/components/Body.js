import React from "react";
import Menu from "./Menu";
import Category from "./Category";
import axios from "axios";

class Body extends React.Component {
  state = {
    menu: {},
    category: []
  };
  render() {
    return (
      <div className="body">
        {this.state.category.map(menuCat => {
          return (
            <div key={menuCat} className="body-category-block">
              <Category category={menuCat} />
              <div className="menu-body">
                {this.state.menu.menu[menuCat].map(item => {
                  return (
                    <Menu
                      key={item.id}
                      id={item.id}
                      menu={item.title}
                      menuDescription={item.description}
                      price={item.price}
                      menuImg={item.picture}
                      click={this.props.click}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get("https://deliveroo-api.now.sh/menu");
    const menuCategory = Object.keys(response.data.menu);
    const filteredCat = menuCategory.filter(x => {
      if (response.data.menu[x].length > 0) {
        return true;
      }
      return false;
    });
    this.setState({ menu: response.data, category: filteredCat });
  }
}

export default Body;
