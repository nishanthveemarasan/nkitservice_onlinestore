import React, { useEffect } from "react";
import classes from "./Home.module.css";
import Navigation from "./Navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { getCartItems } from "src/store/cart-reducer";
import ProductCartItem from "./UI/Product/ProductCartItem";
import Footer from "./Footer/Footer";
// import MainNavigation from "./Navigation/MainNavigation/MainNavigation";
// import { CContainer } from "@coreui/react";
const Checkout = React.lazy(() => import("./Pages/Checkout"));
const Shop = React.lazy(() => import("./Pages/Shop"));
const productCartItem = React.lazy(() =>
  import("./UI/Product/ProductCartItem")
);
const Payment = React.lazy(() => import("./Pages/Payment/Payment"));
const PayResponse = React.lazy(() => import("./Pages/Payment/Success/Success"));
const PageNotFound = React.lazy(() => import("../pages/page404/Page404"));
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  const mapStateToProps = (state) => {
    return {
      cartData: state.cartStore.cart,
    };
  };

  const state = useSelector(mapStateToProps);
  return (
    <>
      <BrowserRouter basename="/store">
        <Navigation cartData={state.cartData.data} />
        <main className={classes.marginProduct}>
          <Switch>
            <Route exact path="/" name="Shop" render={() => <Shop />} />
            <Route
              exact
              path="/product-item/:id"
              name="Cart Item"
              render={() => <ProductCartItem />}
            />
            <Route
              exact
              path="/cart"
              name="Checkout"
              render={() => <Checkout cartData={state.cartData} />}
            />

            <Route
              exact
              path="/payment"
              name="Payment"
              render={() => <Payment cartData={state.cartData} />}
            />

            <Route
              exact
              path="/success"
              name="payResponse"
              render={() => <PayResponse />}
            />
            <Route path="*" name="home" render={() => <PageNotFound />} />
          </Switch>
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
};
export default Home;
