import { API_URL } from "src/API/api";
import { cartStoreAction } from "./store";

export const getShopProducts = (data) => {
  return async (dispatch) => {
    try {
      // console.log(data);
      dispatch(cartStoreAction.sendInitialRequest());
      let sendRequest;
      sendRequest = await fetch(`${API_URL}store/filter_shop_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await sendRequest.json();
      dispatch(
        cartStoreAction.getShopProducts({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getShopProductByName = (name) => {
  return async (dispatch) => {
    try {
      dispatch(cartStoreAction.sendInitialRequest());
      const sendRequest = await fetch(
        `${API_URL}store/get-product-by-name/${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const response = await sendRequest.json();
      dispatch(
        cartStoreAction.getShopProducts({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const addCartItems = (data) => {
  return async (dispatch) => {
    try {
      dispatch(cartStoreAction.updateLoadId({ name: data.itemname }));
      const postData = await fetch(`${API_URL}store/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await postData.json();
      // console.log(response);
      dispatch(cartStoreAction.addProductToCart({ data }));
      setTimeout(() => {
        dispatch(cartStoreAction.updateLoadId({ name: "" }));
      }, 500);
    } catch (error) {
      console.log("hi", error.message);
    }
  };
};
export const deductCartItems = (data) => {
  return async (dispatch) => {
    try {
      dispatch(cartStoreAction.updateLoadId({ name: data.itemname }));
      const postData = await fetch(`${API_URL}store/remove-from-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await postData.json();
      dispatch(cartStoreAction.reduceProductFromCart({ data }));
      dispatch(cartStoreAction.updateLoadId({ name: "" }));
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getCartItems = () => {
  return async (dispatch) => {
    try {  
      const getData = await fetch(`${API_URL}store/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const response = await getData.json();
      dispatch(
        cartStoreAction.loadCartItems({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const removeCartFromList = (id) => {
  return async (dispatch) => {
    dispatch(cartStoreAction.sendRequest());
    try {
      const deleteData = await fetch(`${API_URL}store/delete/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const response = await deleteData.json();
      dispatch(cartStoreAction.removeCartItem({ id }));
    } catch (error) {
      console.log(error.response);
    }
    dispatch(cartStoreAction.getResponse());
  };
};

export const storeCustomerData = (data) => {
  return async (dispatch) => {
    dispatch(cartStoreAction.sendStoreCustomerRequest());
    try {
      const storeData = await fetch(`${API_URL}store/cache-customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await storeData.json();
      dispatch(cartStoreAction.getStoreCustomerResponse());
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const makePayment = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(cartStoreAction.sendPaymentRequest());
      const storeData = await fetch(`${API_URL}store/make-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await storeData.json();
      dispatch(
        cartStoreAction.updatePaymentData({
          data: response.data,
        })
      );
      dispatch(cartStoreAction.getPaymentRes());
      history.push("/success");
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const emptyStoreCartData = () => {
  return async (dispatch) => {
    dispatch(cartStoreAction.emptyCartData());
    try {
      const sendrequest = await fetch(`${API_URL}store/clear-cache`);
      const response = await sendrequest.json();
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getFilterShopData = (data) => {
  return async (dispatch) => {
    console.log(data);
    try {
      const sendrequest = await fetch(`${API_URL}store/filter_shop_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await sendrequest.json();
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
};
