import { CContainer, CRow, CCol, CAlert } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CheckoutBox from "../UI/CheckoutBox/CheckoutBox";
import CheckoutCartItems from "../UI/CheckoutCartItems";
import SSpinner from "../UI/spinner/SSpinner";
import classes from "./Checkout.module.css";
import { useHistory } from "react-router";
import { getCartItems } from "src/store/cart-reducer";
const Checkout = (props) => {
  const history = useHistory();
  const [cartData, setCartData] = useState({
    data: [],
    isDataReceived: false,
    total: 0,
  });
  useEffect(() => {
    const totalAmount = props.cartData.data.reduce(
      (acc, el) => acc + el.totalPrice,
      0
    );
    setCartData((prevState) => {
      return {
        ...prevState,
        data: props.cartData.data,
        isDataReceived: props.cartData.isDataReceived,
        total: totalAmount,
      };
    });
  }, [props.cartData]);
  const onPaymentChangeHandler = () => {
    history.push("/payment");
  };
  return (
    <div>
      {!cartData.isDataReceived && <SSpinner size="lg" color="primary" />}
      {cartData.isDataReceived && (
        <>
          {cartData.data.length === 0 && (
            <CContainer className={classes.emptyCheckout}>
              <CAlert color="danger">
                Currently!! There is no ITEMS in the Shopping Cart
              </CAlert>
              <div
                style={{
                  textDecoration: "underline",
                  fontSize: "100%",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                <NavLink to="/">Continue Shopping</NavLink>
              </div>
            </CContainer>
          )}
          {cartData.data.length > 0 && (
            <CContainer>
              <CRow>
                <CCol sm={12} md={12} lg={8}>
                  {cartData.data.map((item, index) => {
                    return (
                      <div key={index}>
                        <CheckoutCartItems item={item} />
                      </div>
                    );
                  })}
                </CCol>
                <CCol
                  sm={12}
                  md={12}
                  lg={4}
                  className="mt-md-5 mt-sm-5 mt-lg-0 mt-xl-0"
                >
                  <CheckoutBox
                    data={cartData.data}
                    heading="Order Summary"
                    click={onPaymentChangeHandler}
                  />
                </CCol>
              </CRow>
            </CContainer>
          )}
        </>
      )}
    </div>
  );
};
export default Checkout;
