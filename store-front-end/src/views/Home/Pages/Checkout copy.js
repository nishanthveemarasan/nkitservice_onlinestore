import { CContainer, CRow, CCol, CAlert } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CheckoutBox from "../UI/CheckoutBox/CheckoutBox";
import CheckoutCartItems from "../UI/CheckoutCartItems";
import SSpinner from "../UI/spinner/SSpinner";
import classes from "./Checkout.module.css";
import { useHistory } from "react-router";
const Checkout = (props) => {
  const history = useHistory();
  const mapStateToProps = (state) => {
    return {
      data: state.cartStore.cart.data,
      isDataReceived: state.cartStore.cart.isDataReceived,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const totalAmount = state.data.reduce((acc, el) => acc + el.totalPrice, 0);
  const [cartData, setCartData] = useState({
    data: [],
    isDataReceived: false,
  });
  useEffect(() => {
    console.log(props.cartData);
  }, [props.cartData]);
  const onPaymentChangeHandler = () => {
    history.push("/payment");
  };
  return (
    <>
      <CContainer>
        {state.data.length === 0 && (
          <div className={classes.emptyCheckout}>
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
          </div>
        )}
        {state.data.length > 0 && (
          <>
            <CRow>
              <CCol sm={12} md={12} lg={8}>
                {state.loading && <SSpinner size="lg" color="primary" />}
                {state.data.map((item, index) => {
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
                  data={state.data}
                  heading="Order Summary"
                  click={onPaymentChangeHandler}
                />
              </CCol>
            </CRow>
          </>
        )}
      </CContainer>
    </>
  );
};
export default Checkout;
