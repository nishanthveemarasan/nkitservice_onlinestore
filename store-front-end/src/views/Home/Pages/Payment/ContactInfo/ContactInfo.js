import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CCol, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import AInput from "../UI/AInput";
import { email, phone, required } from "../UI/Validator/Validator";
import classes from "./ContactInfo.module.css";
import { Form } from "react-bootstrap";
import SButton from "src/views/Home/UI/SButton";
import { storeCustomerData } from "src/store/cart-reducer";
import { API_URL } from "src/API/api";
import SSpinner from "src/views/Home/UI/spinner/SSpinner";

const ContactInfo = (props) => {
  const mapStateToProps = (state) => {
    return {
      isDataStored: state.cartStore.customer.isDataStored,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    firstName: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    lastName: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    phone: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, phone],
    },
    lineOne: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    town: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    state: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    zip: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    country: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
  });
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      // setLoading(true);
      const getCustomerData = await fetch(`${API_URL}store/get-cache-customer`);
      const data = await getCustomerData.json();
      const customerData = data.data;
      let formData = {
        ...info,
      };
      for (const type in customerData) {
        formData[type] = {
          ...formData[type],
          value: customerData[type],
          valid: true,
          touched: true,
        };
      }
      setInfo(formData);
      // setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const onChangeHandler = (e, type) => {
    const value = e.target.value;
    let isValid = true;
    for (const validator of info[type].validators) {
      isValid = isValid && validator(value);
    }
    setInfo((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          value: value,
          valid: isValid,
        },
      };
    });
  };
  const onBlurHandler = (e, type) => {
    setInfo((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          touched: true,
        },
      };
    });
  };
  let isFormValid = true;
  for (const input in info) {
    isFormValid = isFormValid && info[input].valid;
  }

  const onContactInfoSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      firstName: info.firstName.value,
      lastName: info.lastName.value,
      email: info.email.value,
      phone: info.phone.value,
      lineOne: info.lineOne.value,
      town: info.town.value,
      state: info.state.value,
      zip: info.zip.value,
      country: info.country.value,
    };
    dispatch(storeCustomerData(data));
    props.validation(info);
  };
  return (
    <>
      <Form onSubmit={onContactInfoSubmitHandler}>
        <CRow>
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.firstName.touched && !info.firstName.valid
                ? `${classes.input} ${classes.invalid}`
                : classes.input
            }
            label="First Name"
            type="text"
            id="firstName"
            size={{ sm: "12", md: "12", lg: "6" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.firstName.value}
          />
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.lastName.touched && !info.lastName.valid
                ? `${classes.input} ${classes.invalid}`
                : classes.input
            }
            label="Last Name"
            type="text"
            id="lastName"
            size={{ sm: "12", md: "12", lg: "6" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.lastName.value}
          />
        </CRow>
        <CRow>
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.email.touched && !info.email.valid
                ? `${classes.input} ${classes.invalid}`
                : classes.input
            }
            label="Email Address"
            id="email"
            placeHolder="example@email.com"
            type="text"
            size={{ sm: "12", md: "12", lg: "6" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.email.value}
          />
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.phone.touched && !info.phone.valid
                ? `${classes.input} ${classes.invalid}`
                : classes.input
            }
            label="Phone Number"
            placeHolder="+12-123345556"
            type="text"
            id="phone"
            size={{ sm: "12", md: "12", lg: "6" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.phone.value}
          />
        </CRow>
        <CRow>
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.lineOne.touched && !info.lineOne.valid
                ? `${classes.input2} ${classes.invalid}`
                : classes.input2
            }
            id="lineOne"
            label="Address Line 1"
            type="text"
            size={{ sm: "12", md: "12", lg: "12" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.lineOne.value}
          />
        </CRow>
        <CRow>
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.town.touched && !info.town.valid
                ? `${classes.input1} ${classes.invalid}`
                : classes.input1
            }
            label="Town/City"
            type="text"
            id="town"
            size={{ sm: "12", md: "12", lg: "4" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.town.value}
          />
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.state.touched && !info.state.valid
                ? `${classes.input1} ${classes.invalid}`
                : classes.input1
            }
            label="State/County"
            id="state"
            type="text"
            size={{ sm: "12", md: "12", lg: "4" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.state.value}
          />
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.zip.touched && !info.zip.valid
                ? `${classes.input1} ${classes.invalid}`
                : classes.input1
            }
            label="ZIP Code"
            type="text"
            id="zip"
            size={{ sm: "12", md: "12", lg: "4" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.zip.value}
          />
        </CRow>
        <CRow>
          <AInput
            styleLabel={classes.label}
            styleInput={
              info.country.touched && !info.country.valid
                ? `${classes.input2} ${classes.invalid}`
                : classes.input2
            }
            label="Country"
            type="text"
            id="country"
            size={{ sm: "12", md: "12", lg: "12" }}
            change={onChangeHandler}
            blur={onBlurHandler}
            value={info.country.value}
          />
        </CRow>
        <CRow>
          <CCol sm={12} md={12} className="text-right">
            <SButton
              name="Next"
              type="submit"
              showName={true}
              color="primary"
              disabled={!isFormValid}
              showSpinner={state.isDataStored}
              width="20%"
            />
          </CCol>
        </CRow>
      </Form>
    </>
  );
};
export default React.memo(ContactInfo);
