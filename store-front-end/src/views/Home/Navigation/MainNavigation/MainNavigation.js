import { NavLink } from "react-bootstrap";
import classes from "./MainNavigation.module.css";
import { useState } from "react";
import SButton from "../../UI/SButton";
import { useHistory } from "react-router";

const MainNavigation = (props) => {
  const history = useHistory();
  let count;
  if (props.cartData.length > 0) {
    count = props.cartData.reduce((acc, el) => acc + el.count, 0);
  } else {
    count = 0;
  }
  const [showNavLinks, setShowNavLinks] = useState(false);
  const onShowNavBarHandler = () => {
    setShowNavLinks((prevState) => !prevState);
  };
  const OnCheckoutPageHandler = () => {
    history.push("/cart");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbar_brand}>
        <NavLink to="/">MY SHOP</NavLink>
      </div>
      <ul
        className={`${classes.navbar_items} ${
          showNavLinks ? classes.navbar_items_mobile : ""
        }`}
      >
        <li className={classes.navbar_item}>
          <div className={classes.nav_heading}>Home</div>
          <ul className={classes.dropMenu}>
            <li className={classes.dropMenu_item}>
              <NavLink to="/">Drop Menu 1</NavLink>
            </li>
            <li className={classes.dropMenu_item}>
              <NavLink to="/">Drop Menu 2</NavLink>
            </li>
            <li className={classes.dropMenu_item}>
              <NavLink to="/">Drop Menu 3</NavLink>
            </li>
            <li className={classes.dropMenu_item}>
              <NavLink to="/">Drop Menu 4</NavLink>
            </li>
          </ul>
        </li>
        <li className={classes.navbar_item}>
          <div className={classes.nav_heading}>Shop</div>
        </li>
        <li className={classes.navbar_item}>
          <div className={classes.nav_heading}>Products</div>
        </li>
        <li className={classes.navbar_item}>
          <div className={classes.nav_heading}>Features</div>
          <div className={classes.megaMenu}>
            <div className={classes.row}>
              <header>Design Services</header>
              <ul className={classes.megaMenu_items}>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Graphics</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
              </ul>
            </div>
            <div className={classes.row}>
              <header>Design Services</header>
              <ul className={classes.megaMenu_items}>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Graphics</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
              </ul>
            </div>
            <div className={classes.row}>
              <header>Design Services</header>
              <ul className={classes.megaMenu_items}>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Graphics</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
              </ul>
            </div>
            <div className={classes.row}>
              <header>Design Services</header>
              <ul className={classes.megaMenu_items}>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Graphics</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
              </ul>
            </div>
            <div className={classes.row}>
              <header>Design Services</header>
              <ul className={classes.megaMenu_items}>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Graphics</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
                <li className={classes.megaMenu_item}>
                  <NavLink to="/">Vectors</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className={classes.navbar_item}>
          <div className={classes.nav_heading}>Pages</div>
        </li>
        <li className={classes.navbar_item}>
          <div className={classes.nav_heading}>
            <i className="fa fa-shopping-cart" onClick={OnCheckoutPageHandler}>
              <span
                className={`badge btn-primary badge-pill ${classes.cartBadge}`}
              >
                {count}
              </span>
              <span
                className={`badge btn-primary badge-pill ${classes.cartBadgeMoble}`}
              >
                {count}
              </span>
            </i>
          </div>
          {props.cartData.length > 0 && (
            <div className={classes.cartMenu}>
              {props.cartData.map((el, i) => {
                return (
                  <div key={i}>
                    <div className={classes.row}>
                      <div className={classes.col}>
                        <div className={classes.cartMenu_item}>
                          {el.itemname}
                        </div>
                      </div>
                      <div className={classes.col}>
                        <div
                          className={classes.cartMenu_item}
                        >{`x${el.count}`}</div>
                      </div>
                      <div className={classes.col}>
                        <div
                          className={classes.cartMenu_item}
                        >{`$${el.totalPrice}`}</div>
                      </div>
                    </div>
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
      <div className={classes.menuBtn}>
        <i className="fas fa-bars" onClick={onShowNavBarHandler}></i>
      </div>
    </nav>
  );
};
export default MainNavigation;
