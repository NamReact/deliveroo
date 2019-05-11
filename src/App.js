import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import "./index.css";
import axios from "axios";
import Body from "./components/Body";
import Basket from "./components/Basket";
import Popup from "./components/Popup";
import NavBar from "./components/NavBar";

class App extends React.Component {
  state = {
    menu: null,
    menuCategory: [],
    storedMenu: {},
    quantity: 1,
    order: [],
    popupPrice: null,
    totalBasketPrice: 0,
    navList: false
  };

  /* *** Pop Up *** */
  /* Function called when clicking on any menu */
  /* The pop up is hidden by default */

  window = e => {
    /* Retrieve the id of the clicked item */

    const menuId = e.currentTarget.id;

    /* Get the element that serve as pop up */

    const popup = document.getElementById("popup");
    const body = document.body;

    /* Copy the menu from state, go through it to find the matching menu using the id */

    let menu = { ...this.state.menu.menu };
    const menuCat = Object.keys(menu);
    let selectedMenu = {};
    for (let i = 0; i < menuCat.length; i++) {
      for (let j = 0; j < menu[menuCat[i]].length; j++)
        if (menu[menuCat[i]][j].id === menuId) {
          /* The price must be set to cents to avoid a bug which occurs when multiplying decimal
          numbers by 3. Must divide by 100 after calculations for total price */

          const matchMenu = { ...menu[menuCat[i]][j] };
          selectedMenu = matchMenu;
          selectedMenu.price = matchMenu.price * 100;
        }
    }

    /* Blocking the scrolling of the website by adding a class containing 
    overflow : hidden to the body */

    body.classList.add("hidden");

    /* Make the pop up appear by changing the display from 'none' to 'flex. */

    popup.style.display = "flex";

    /* Storing the clicked menu for later use */

    this.setState({ storedMenu: selectedMenu });
    e.preventDefault();
  };

  /* *** Function to modify the quantity in the pop up *** */

  remove = () => {
    let count = this.state.quantity;

    /* The quantity cannot be lower than 1 */

    if (count > 1) {
      count = count - 1;
    }
    const popupTotal = (count * this.state.storedMenu.price) / 100;
    this.setState({ quantity: count, popupPrice: popupTotal.toFixed(2) });
  };

  add = () => {
    let count = this.state.quantity;
    count = count + 1;
    const popupTotal = (count * this.state.storedMenu.price) / 100;
    this.setState({ quantity: count, popupPrice: popupTotal.toFixed(2) });
  };

  /* *** Closing the pop up *** */

  close = () => {
    const popup = document.getElementById("popup");
    const body = document.body;
    body.classList.remove("hidden");
    popup.style.display = "none";

    /* Making sure the quantity is set back to 1 in case user changed it before closing the pop up */

    this.setState({ quantity: 1, popupPrice: null, storedMenu: {} });
  };

  /* *** Basket management *** */
  /* This function is called upon clicking the total button in the pop up */
  /* The basket is in fact 2 different elements. First one is visible when user's basket is empty.
  Second one appears when 1 or more items is selected. Only 1 basket is displayed at any given time */

  basket = () => {
    /* Retrieve both baskets */

    let eBasket = document.getElementById("empty-basket");
    const bBasket = document.getElementById("buying-basket");

    /* Closing the pop up */

    this.close();

    /* Switching display for both baskets by adding/removing classes */

    eBasket.style.display = "none";
    bBasket.classList.remove("none");
    bBasket.classList.add("basket-buying-container");

    /* * The basket displays an array of object. Each object represent 1 type of menu. * */

    /* The following code update the array using the data stored from the pop up */
    /* A new object is created  */

    const newOrder = [...this.state.order];
    const quantity = this.state.quantity;
    const storedMenu = { ...this.state.storedMenu };
    const unitPrice = storedMenu.price;
    const totalPrice = (quantity * unitPrice) / 100;
    const newOrderObject = {
      id: this.state.storedMenu.id,
      title: this.state.storedMenu.title,
      quantity: this.state.quantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice
    };

    /* The code runs through the array to check if the stored menu has already been ordered */

    if (newOrder.length === 0) {
      /* No need to run through the array if the is nothing in it */

      newOrder.push(newOrderObject);
    } else {
      for (let i = 0; i < newOrder.length; i++) {
        /* Testing for matching id */

        if (newOrder[i].id === newOrderObject.id) {
          /* Update of quantity and price if the condition is true so the basket does not display the same menu twice */

          newOrder[i].quantity = newOrder[i].quantity + newOrderObject.quantity;
          newOrder[i].totalPrice =
            (Number(newOrder[i].totalPrice * 100) +
              Number(newOrderObject.totalPrice * 100)) /
            100;
          break;
        }

        /* If no match has been found then the code pushes the object into the array */

        if (i === newOrder.length - 1 && newOrder[i].id !== newOrderObject.id) {
          newOrder.push(newOrderObject);
          break;
        }
      }
    }

    /* The array is sent to totalBasket() for total basket price calculation */

    const totalBasketPrice = this.totalBasket(newOrder);

    /* When updating the state, all states for temporary uses is reset */

    this.setState({
      order: newOrder,
      totalBasketPrice: totalBasketPrice,
      popupPrice: null,
      quantity: 1,
      storedMenu: {}
    });
  };

  /* *** Calculate the basket's total price *** */

  totalBasket = allOrder => {
    let totalBasketPrice = 0;
    for (let i = 0; i < allOrder.length; i++) {
      totalBasketPrice = totalBasketPrice + allOrder[i].totalPrice * 100;
    }
    totalBasketPrice = totalBasketPrice / 100;
    return totalBasketPrice;
  };

  /* *** Changing quantity in the basket *** */

  removeBasket = e => {
    /* Retrieve parent's element id with e.currentTarget */

    const menuId = e.currentTarget.id;
    const allOrder = [...this.state.order];

    /* The code test find the matching id in the order array */

    for (let i = 0; i < allOrder.length; i++) {
      if (allOrder[i].id === menuId) {
        if (allOrder[i].quantity === 0) {
          /* If quantity is 0 then the object is taken out of the array */

          allOrder.splice(i, 1);
        } else {
          /* Else the quantity and price is updated */

          allOrder[i].quantity = allOrder[i].quantity - 1;
          allOrder[i].totalPrice =
            (allOrder[i].quantity * allOrder[i].unitPrice) / 100;
        }
      }
    }
    let eBasket = document.getElementById("empty-basket");
    const bBasket = document.getElementById("buying-basket");

    /* In case the basket is empty, the code switch back the display of both baskets */

    if (allOrder.length === 1) {
      eBasket.style.display = "block";
      bBasket.classList.remove("basket-buying-container");
      bBasket.classList.add("none");
    }

    /* The basket's price is updated along with the order array */

    this.setState({
      order: allOrder,
      totalBasketPrice: this.totalBasket(allOrder)
    });
  };

  addBasket = e => {
    const menuId = e.currentTarget.id;
    const allOrder = [...this.state.order];
    for (let i = 0; i < allOrder.length; i++) {
      if (allOrder[i].id === menuId) {
        allOrder[i] = { ...allOrder[i] };
        allOrder[i].quantity = allOrder[i].quantity + 1;
        allOrder[i].totalPrice =
          (allOrder[i].quantity * allOrder[i].unitPrice) / 100;
      }
    }
    this.setState({
      order: allOrder,
      totalBasketPrice: this.totalBasket(allOrder)
    });
  };

  /* *** Function to move the viewport to the correct section *** */

  scroll = e => {
    const id = e.target.id;
    const bodyId = "body" + id;
    const body = document.getElementById(bodyId);

    /* The code find the coordinate of the pointed element */
    /* Coordinates are relative to the viewport. That means the number 
    of pixel from current element to the pointed element */

    const rect = body.getBoundingClientRect();

    /* The viewport is moved to the correct section with an offset of 50 pixels */

    window.scrollBy(rect.left, rect.top - 50);
  };

  /* *** This function change the display of the dropdown list in the nav bar *** */

  navList = () => {
    let stateList = this.state.navList;
    stateList = !stateList;
    this.setState({ navList: stateList });
  };

  render() {
    let navListDisplay;
    if (this.state.navList) {
      navListDisplay = "nav-list";
    } else {
      navListDisplay = "none";
    }

    return (
      <div className="App">
        {/* TOP NAV */}

        <div className="nav-background">
          <Nav
            class="logo"
            src="https://consumer-component-library.roocdn.com/13.0.2/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
            alt="Deliveroo logo"
          />
        </div>

        {/* HEADER */}

        <div className="header-background">
          <Header
            imgClass="header-img"
            imgContainerClass="img-container"
            h2name="lala"
            description="lolololololololo"
            src="https://f.roocdn.com/images/menus/17697/header-image.jpg"
            alt="picture"
          />
        </div>

        {/* POP UP */}
        {/* Can be anywhere */}

        <div className="popup" id="popup">
          <div className="closePopup" onClick={this.close}>
            <i class="fas fa-times fa-2x" />
          </div>
          <Popup
            add={this.add}
            remove={this.remove}
            quantity={this.state.quantity}
            title={this.state.storedMenu.title}
            menuDescription={this.state.storedMenu.description}
            price={
              this.state.popupPrice ||
              (this.state.storedMenu.price / 100).toFixed(2)
            }
            img={undefined || this.state.storedMenu.picture}
            click={this.basket}
            cancel={this.close}
          />
        </div>

        {/* NAV BAR */}

        <div className="nav-bar">
          <div className="nav-bar-container">
            <NavBar
              category={this.state.menuCategory}
              click={this.scroll}
              navList={this.navList}
              classNavList={navListDisplay}
            />
          </div>
        </div>

        {/* BODY */}
        {/* Seperated in 2 sections, left section is where everything is displayed, right is reserved for the basket */}

        <div className="body-container">
          <Body click={this.window} />

          {/* * Both baskets * */}

          <div className="basket-div">
            {/* Empty basket */}

            <Basket class="basket-container" id="empty-basket" />

            {/* Filled basket */}

            <div className="none" id="buying-basket">
              <div className="validate-basket">Valider mon panier</div>
              <div className="basket-quantity-container">
                {this.state.order.map(order => {
                  return (
                    <div
                      className="basket-quantity"
                      id={order.id}
                      key={order.id}
                    >
                      <div className="basket-count">
                        <div
                          className="basket-button"
                          onClick={this.removeBasket}
                          id={order.id}
                        >
                          -
                        </div>
                        <div className="basket-number">{order.quantity}</div>
                        <div
                          className="basket-button"
                          onClick={this.addBasket}
                          id={order.id}
                        >
                          +
                        </div>
                      </div>

                      <div className="basket-description">{order.title}</div>
                      <div className="basket-menu-total">
                        {order.totalPrice.toFixed(2) + " €"}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="total-basket">
                <div>Total</div>
                <div>{this.state.totalBasketPrice.toFixed(2) + " €"}</div>
              </div>
            </div>
          </div>
        </div>
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
    this.setState({ menu: response.data, menuCategory: filteredCat });
  }
}

export default App;
