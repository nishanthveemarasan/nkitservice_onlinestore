import { CBadge } from "@coreui/react";
import { NavLink } from "react-bootstrap";
import SButton from "../UI/SButton";
import classes from "./Navigation.module.css";
import { useState } from "react";
import { useHistory } from "react-router";
const Navigation = (props) => {
  const history = useHistory();
  let count;
  if (props.cartData.length > 0) {
    count = props.cartData.reduce((acc, el) => acc + el.count, 0);
  } else {
    count = 0;
  }
  const [showNavBarItems, setShowNavBarItems] = useState(false);
  const [showHomeDropDown, setshowHomeDropDown] = useState(false);
  const [showShopDropDown, setshowShopDropDown] = useState(false);
  const [showFeatureDropDown, setshowFeatureDropDown] = useState(false);
  const OnCheckoutPageHandler = () => {
    history.push("/cart");
  };
  const onHomeChangeHandler = () => {
    history.push("/");
  };
  return (
    <>
      <div
        className={showNavBarItems ? classes.backDrop : ""}
        onClick={() => setShowNavBarItems(!showNavBarItems)}
      ></div>
      <nav className={classes.navbar}>
        <div className={classes.brand}>
          <NavLink onClick={onHomeChangeHandler}>MYSHOP</NavLink>
        </div>
        <ul
          className={`${classes.navbar_items} ${
            showNavBarItems ? classes.mobile_navbar_items : ""
          }`}
        >
          <li className={classes.navbar_item}>
            <NavLink className={classes.link}>Home</NavLink>
            <div
              className={
                showHomeDropDown
                  ? classes.navbar_item_mobile_dropdown
                  : classes.navbar_item_mobile
              }
            >
              <NavLink>Home</NavLink>
              <i
                className={`${
                  showHomeDropDown
                    ? "fa fa-angle-double-down"
                    : "fa fa-angle-double-right"
                }`}
                onClick={() => setshowHomeDropDown(!showHomeDropDown)}
              ></i>
            </div>
            <ul className={classes.dropDown}>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 1</NavLink>
              </li>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 2</NavLink>
              </li>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 3</NavLink>
              </li>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 4</NavLink>
              </li>
            </ul>
          </li>
          <li className={classes.navbar_item}>
            <NavLink className={classes.link}>Shop</NavLink>
            <div
              className={
                showShopDropDown
                  ? classes.navbar_item_mobile_dropdown
                  : classes.navbar_item_mobile
              }
            >
              <NavLink>Shop</NavLink>
              <i
                className={`${
                  showShopDropDown
                    ? "fa fa-angle-double-down"
                    : "fa fa-angle-double-right"
                }`}
                onClick={() => setshowShopDropDown(!showShopDropDown)}
              ></i>
            </div>
            <ul className={classes.dropDown}>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 11</NavLink>
              </li>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 21</NavLink>
              </li>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 31</NavLink>
              </li>
              <li className={classes.dropDown_item}>
                <NavLink>DropDown Item 4</NavLink>
              </li>
            </ul>
          </li>
          <li className={classes.navbar_item}>
            <NavLink>Products</NavLink>
          </li>
          <li className={classes.navbar_item}>
            <NavLink className={classes.link}>Features</NavLink>
            <div
              className={
                showFeatureDropDown
                  ? classes.navbar_item_mobile_dropdown
                  : classes.navbar_item_mobile
              }
            >
              <NavLink>Features</NavLink>
              <i
                className={`${
                  showFeatureDropDown
                    ? "fa fa-angle-double-down"
                    : "fa fa-angle-double-right"
                }`}
                onClick={() => setshowFeatureDropDown(!showFeatureDropDown)}
              ></i>
            </div>
            <div className={classes.megaMenu}>
              <div className={classes.row}>
                <header className={classes.header}>Design Services</header>
                <ul className={classes.megaMenu_tiems}>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                </ul>
              </div>
              <div className={classes.row}>
                <header className={classes.header}>Design Services</header>
                <ul className={classes.megaMenu_tiems}>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                </ul>
              </div>
              <div className={classes.row}>
                <header className={classes.header}>Design Services</header>
                <ul className={classes.megaMenu_tiems}>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                </ul>
              </div>
              <div className={classes.row}>
                <header className={classes.header}>Design Services</header>
                <ul className={classes.megaMenu_tiems}>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                </ul>
              </div>
              <div className={classes.row}>
                <header className={classes.header}>Design Services</header>
                <ul className={classes.megaMenu_tiems}>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                  <li className={classes.megaMenu_tiem}>
                    <NavLink>Graphics</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className={classes.navbar_item}>
            <NavLink>Pages</NavLink>
          </li>
          <li className={classes.navbar_item}>
            <NavLink>
              <i className={`fa fa-shopping-cart ${classes.cart_icon}`}></i>
              <CBadge
                color="danger"
                shape="pill"
                className={
                  showNavBarItems ? classes.cBadge_mobile : classes.cBadge
                }
              >
                {count}
              </CBadge>
            </NavLink>
            {props.cartData.length > 0 && (
              <div className={`${classes.cartMenu}`}>
                {props.cartData.map((el, i) => {
                  return (
                    <div className={classes.row} key={i}>
                      <div className={classes.col}>{el.itemname}</div>
                      <div className={classes.col}>{`x${el.count}`}</div>
                      <div className={classes.col}>{`$${el.totalPrice}`}</div>
                    </div>
                  );
                })}
                <div className={classes.lastRow}>
                  <div className={classes.col}>
                    <SButton
                      name="Shopping Cart"
                      block={false}
                      color="dark"
                      click={OnCheckoutPageHandler}
                      showName={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
        <div
          className={classes.menuBtn}
          onClick={() => setShowNavBarItems(!showNavBarItems)}
        >
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    </>
  );
};
export default Navigation;
