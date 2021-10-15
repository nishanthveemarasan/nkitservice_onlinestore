import React from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
} from "@coreui/react";
import CheckoutBox from "../../UI/CheckoutBox/CheckoutBox";
import { useState, useEffect } from "react";
import Accordian from "./Accordian/Accordian";
import classes from "./Payment.module.css";
import ContactInfo from "./ContactInfo/ContactInfo";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ARadioButton from "./UI/ARadioButton";
import PayCard from "./UI/PayCard/PayCard";
import { makePayment } from "src/store/cart-reducer";
import SSpinner from "../../UI/spinner/SSpinner";
const PageNotFound = React.lazy(() => import("../../../pages/page404/Page404"));
const Payment = (props) => {
  const history = useHistory();
  const mapStateToProps = (state) => {
    return {
      loadButton: state.cartStore.loadPayment,
    };
  };
  const [cartData, setCartData] = useState({
    data: [],
    isDataReceived: false,
  });
  useEffect(() => {
    setCartData((prevState) => {
      return {
        ...prevState,
        data: props.cartData.data,
        isDataReceived: props.cartData.isDataReceived,
      };
    });
  }, [props.cartData]);
  const state = useSelector(mapStateToProps);
  const [accordion, setAccordion] = useState({
    showContactInfo: true,
    showPaymentInfo: false,
    showContactInfoButton: false,
    showPaymentInfoButton: false,
  });
  const [checkbox, setCheckBox] = useState(false);
  const [form, setForm] = useState({
    contactData: "",
  });
  const [radio, setRadio] = useState("");
  const dispatch = useDispatch();
  const [payButton, setPayButton] = useState({
    enable: true,
  });
  const [loadPage, setLoadPage] = useState(true);

  const onShowAccordionHandler = (type) => {
    if (type === "contact_info") {
      setAccordion((prevState) => {
        return {
          ...prevState,
          showContactInfo: !prevState.showContactInfo,
          showPaymentInfo: false,
        };
      });
    } else {
      setAccordion((prevState) => {
        return {
          ...prevState,
          showContactInfo: false,
          showPaymentInfo: !prevState.showPaymentInfo,
        };
      });
    }
  };
  const onCheckboxChangeHandler = (e) => {
    setCheckBox((prevState) => !prevState);
  };
  const onSuccessPageHandler = () => {
    const data = {
      pay_method: radio,
    };
    dispatch(makePayment(data, history));
  };

  const onValidation = (data) => {
    setForm((prevState) => {
      return {
        ...prevState,
        contactData: data,
      };
    });

    setAccordion((prevState) => {
      return {
        ...prevState,
        showContactInfo: false,
        showPaymentInfo: true,
        showContactInfoButton: true,
      };
    });
  };

  const onPayMethoodChangeHandler = (type) => {
    setRadio(type);
    setPayButton((prevState) => {
      return {
        ...prevState,
        enable: false,
      };
    });
  };
  return (
    <div>
      {!cartData.isDataReceived && <SSpinner size="lg" color="primary" />}
      {cartData.isDataReceived && (
        <>
          {cartData.data.length === 0 && <PageNotFound />}
          {cartData.data.length > 0 && (
            <CContainer>
              <CRow>
                <CCol sm={12} md={8}>
                  <div id="accordion">
                    <Accordian
                      heading={"CONTACT INFORMATION"}
                      accordion={accordion.showContactInfo}
                      showButton={form.isBillingFormValid}
                      button={{
                        name: "Change Info",
                        click: () => onShowAccordionHandler("contact_info"),
                        showButton: accordion.showContactInfoButton,
                      }}
                    >
                      <CCard>
                        <CCardHeader>
                          <h3 className="text-primary">Billing Address</h3>
                        </CCardHeader>
                        <CCardBody>
                          <ContactInfo validation={onValidation} />
                        </CCardBody>
                      </CCard>
                    </Accordian>
                    <Accordian
                      heading={"PAYMENT INFORMATION"}
                      accordion={accordion.showPaymentInfo}
                      showButton={form.isBillingFormValid}
                      button={{
                        name: "Change Pay Info",
                        click: () => onShowAccordionHandler("payment_info"),
                        showButton: accordion.showPaymentInfoButton,
                      }}
                    >
                      <ARadioButton
                        label="Credit Card"
                        id="credit_card"
                        radioClass={classes.radioClass}
                        labelClass={classes.labelClass}
                        checked={radio === "credit_card"}
                        change={onPayMethoodChangeHandler}
                      />
                      {radio === "credit_card" && <PayCard />}
                      <ARadioButton
                        label="Stripe Payment"
                        id="stripe"
                        radioClass={classes.radioClass}
                        labelClass={classes.labelClass}
                        checked={radio === "stripe"}
                        change={onPayMethoodChangeHandler}
                      />
                      <ARadioButton
                        label="Paypal Payment"
                        id="paypal"
                        radioClass={classes.radioClass}
                        labelClass={classes.labelClass}
                        checked={radio === "paypal"}
                        change={onPayMethoodChangeHandler}
                      />
                    </Accordian>
                  </div>
                </CCol>
                <CCol sm={12} md={4}>
                  <CheckoutBox
                    data={cartData.data}
                    heading="Order Summary"
                    buttonName="Place Order"
                    click={onSuccessPageHandler}
                    showSpinner={state.loadButton}
                    SpinnerSize="lg"
                    disabled={payButton.enable}
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
export default Payment;
