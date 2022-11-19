import CIcon from "@coreui/icons-react";
import { useEffect, useState } from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import { useHistory } from "react-router";
import SButton from "src/views/Home/UI/SButton";
import OrderItems from "./OrderItems";
import classes from "./Success.module.css";
import { useSelector, useDispatch } from "react-redux";
import SSpinner from "src/views/Home/UI/spinner/SSpinner";
import { emptyStoreCartData } from "src/store/cart-reducer";

const Success = () => {
  const mapStateToProps = (state) => {
    return {
      data: state.cartStore.paymentData,
    };
  };
  const [response, setResponse] = useState({
    orderId: "",
    customerDetails: "",
    orderDetails: [],
    totalAmount: 0.0,
    orderDate: "",
  });
  const [loading, setLoading] = useState(false);
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (state.data) {
      dispatch(emptyStoreCartData());
      setResponse((prevState) => {
        return {
          ...prevState,
          orderId: state.data.order_id,
          customerDetails: state.data.customer_details,
          orderDetails: state.data.order_details,
          totalAmount: state.data.amount,
          orderDate: state.data.created_at,
        };
      });
      setLoading(true);
    } else {
      history.push("/");
    }
  }, [dispatch, state.data, history]);
  const onCHangeHomeHandler = () => {
    history.push("/");
  };
  return (
    <>
      {!loading && <SSpinner size="lg" color="primary" />}
      {loading && (
        <CContainer>
          <CRow>
            <CCol sm={12} md={1}></CCol>
            <CCol sm={12} md={10}>
              <div className={classes.success}>
                <CIcon name="cil-check-circle" className={classes.icon} />
                <h1 className={classes.heading}>Thank You</h1>
                <h3 className={classes.heading}>
                  Success! We received your payment. Your order will be
                  processed soon.
                </h3>
                <h4 className={classes.subHeading}>
                  Your Transaction ID : {response.orderId}
                </h4>
              </div>
              <div className="mt-3">
                <CRow>
                  <CCol sm={12} md={8}>
                    <h3 className="mb-4">Billing To :</h3>
                    <div className={classes.address}>
                      <p>{`${response.customerDetails.firstName} ${response.customerDetails.lastName}`}</p>
                      <p>{response.customerDetails.lineOne}</p>
                      <p>{response.customerDetails.town}</p>
                      <p>{`${response.customerDetails.state} ${response.customerDetails.zip}`}</p>
                      <p>{response.customerDetails.country}</p>
                    </div>
                  </CCol>
                  <CCol sm={12} md={4}>
                    <h3 className="mb-4">Order Summary</h3>
                    <div className={classes.address}>
                      <p>
                        Order Id : <b>{response.orderId}</b>
                      </p>
                      <p>
                        Order Date : <b>{response.orderDate}</b>
                      </p>
                      <p>
                        Order Total : <b>{`$${response.totalAmount}`}</b>
                      </p>
                    </div>
                  </CCol>
                </CRow>
              </div>
              <div className="mt-5 text-center">
                <h1>Your Order Details</h1>
                {response.orderDetails.map((item, i) => {
                  return (
                    <div key={i}>
                      <OrderItems data={item} />
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <SButton
                  name="GO TO SHOP"
                  showName={true}
                  color="primary"
                  click={onCHangeHomeHandler}
                />
              </div>
            </CCol>
            <CCol sm={12} md={1}></CCol>
          </CRow>
        </CContainer>
      )}
    </>
  );
};
export default Success;
