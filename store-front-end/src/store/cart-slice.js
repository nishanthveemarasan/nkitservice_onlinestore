import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "src/API/api";
import { cartStoreAction } from "./store";
const initialState = {
  storeData: [],
  shopData: {
    data: [],
    isDataReceived: false,
    reRun: {
      isDatachaged: true,
      param: "",
    },
  },
  cart: {
    data: [],
    isDataReceived: false,
    alertMsg: "",
    alertColor: "",
  },
  search: {
    isLoading: false,
    data: [],
  },
  loadCounter: {
    name: "",
  },
  isLoading: false,
  singleProduct: {
    id: 0,
  },
  customer: {
    data: "",
    isDataStored: false,
    isDataReceived: false,
  },
  paymentData: "",
  loadPayment: false,
  filterData: {
    category: "",
    color: [],
    height: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    sendInitialRequest(state) {
      state.shopData = {
        ...state.shopData,
        isDataReceived: false,
      };
    },
    getShopProducts(state, action) {
      state.shopData = {
        ...state.shopData,
        data: action.payload.data,
        isDataReceived: true,
      };
      // console.log(state.shopData);
    },
    updateProductId(state, action) {
      state.singleProduct = {
        ...state.singleProduct,
        id: action.payload.id,
      };
      console.log(state.singleProduct);
    },
    addProductToCart(state, action) {
      const cartArray = state.cart.data.slice();
      const data = action.payload.data;
      if (cartArray.length === 0) {
        cartArray.push({
          id: data.id,
          itemname: data.itemname,
          image_url: data.image_url,
          count: data.count,
          unitPrice: data.unitPrice,
          discount: data.discount,
          totalDiscount: data.discount,
          totalPrice: data.unitPrice,
        });
        state.cart = {
          ...state.cart,
          data: [...cartArray],
          isDataReceived: true,
          alertColor: "success",
          alertMsg: "new Item has been added to cart!!",
        };
      } else {
        const getItemId = cartArray.findIndex((el, i) => {
          return el.itemname === action.payload.data.itemname;
        });
        const existingCartItem = cartArray[getItemId];
        if (existingCartItem) {
          const newCount = existingCartItem.count + 1;
          const newDiscount =
            existingCartItem.totalDiscount + action.payload.data.discount;
          const newTotal = newCount * action.payload.data.unitPrice;
          const updateData = {
            ...existingCartItem,
            count: newCount,
            totalPrice: Number.parseFloat(newTotal.toFixed(2)),
            totalDiscount: Number.parseFloat(newDiscount.toFixed(2)),
          };
          cartArray[getItemId] = updateData;
          // state.cart.data = [...cartArray];
          state.cart = {
            ...state.cart,
            data: [...cartArray],
            alertColor: "success",
            alertMsg: "new Item has been added to cart!!",
          };
        } else {
          cartArray.push({
            id: data.id,
            itemname: data.itemname,
            image_url: data.image_url,
            count: data.count,
            discount: data.discount,
            unitPrice: data.unitPrice,
            totalDiscount: data.discount,
            totalPrice: data.unitPrice,
          });
          state.cart = {
            ...state.cart,
            data: [...cartArray],
            alertColor: "success",
            alertMsg: "new Item has been added to cart!!",
          };
        }
      }
    },
    reduceProductFromCart(state, action) {
      const data = action.payload.data;
      let cartItem;
      const copyCartArray = state.cart.data.slice();
      const getIndex = copyCartArray.findIndex((el, index) => {
        return el.itemname === data.itemname;
      });
      const getCartItem = copyCartArray[getIndex];
      if (getCartItem) {
        const newCount = getCartItem.count - 1;
        const newDiscount = getCartItem.totalDiscount - data.discount;
        const newTotal = newCount * data.unitPrice;
        if (newCount > 0) {
          cartItem = {
            ...getCartItem,
            count: newCount,
            totalDiscount: Number.parseFloat(newDiscount.toFixed(2)),
            totalPrice: Number.parseFloat(newTotal.toFixed(2)),
          };
          copyCartArray[getIndex] = cartItem;
          state.cart = {
            ...state.cart,
            data: [...copyCartArray],
            alertColor: "danger",
            alertMsg: "An item has been removed from the cart!!",
          };
        } else {
          copyCartArray.splice(getIndex, 1);
          state.cart = {
            ...state.cart,
            data: [...copyCartArray],
            alertColor: "danger",
            alertMsg: "An item has been removed from the cart!!",
          };
        }
      }
    },

    reduceCartItem(state, action) {
      const data = action.payload.data;
      let cartItem;
      const copyCartArray = state.cart.data.slice();
      //if it is in the array and count > 0
      const getIndex = copyCartArray.findIndex((el, index) => {
        return el.id === data.id;
      });

      const getCartItem = copyCartArray[getIndex];
      if (getCartItem) {
        if (data.count > 0) {
          cartItem = {
            ...getCartItem,
            count: data.count,
            totalPrice: data.count * data.unitPrice,
          };
          copyCartArray[getIndex] = cartItem;
          // state.cart.data = [...copyCartArray];
          state.cart = {
            ...state.cart,
            data: [...copyCartArray],
            alertColor: "danger",
            alertMsg: "An item has been removed from the cart!!",
          };
        } else {
          copyCartArray.splice(getIndex, 1);
          state.cart = {
            ...state.cart,
            data: [...copyCartArray],
            alertColor: "danger",
            alertMsg: "An item has been removed from the cart!!",
          };
        }
      }
    },
    removeCartItem(state, action) {
      const id = action.payload.id;
      const copyArray = [...state.cart.data];
      const getIndex = copyArray.findIndex((el) => el.id === id);
      copyArray.splice(getIndex, 1);
      // state.cart.data = [...copyArray];
      state.cart = {
        ...state.cart,
        data: [...copyArray],
      };
    },
    sendSearchRequest(state) {
      state.search = {
        ...state.search,
        isLoading: true,
      };
    },
    getSearchData(state, action) {
      state.search = {
        data: action.payload.data,
        isLoading: false,
      };
    },
    updateLoadId(state, action) {
      state.loadCounter = {
        name: action.payload.name,
      };
    },
    loadCartItems(state, action) {
      state.cart = {
        data: action.payload.data,
        isDataReceived: true,
      };
      // console.log(state.cart);
    },
    sendRequest(state) {
      state.isLoading = true;
    },
    getResponse(state) {
      state.isLoading = false;
    },
    sendStoreCustomerRequest(state) {
      state.customer = {
        ...state.customer,
        isDataStored: true,
      };
    },
    getStoreCustomerResponse(state) {
      state.customer = {
        ...state.customer,
        isDataStored: false,
      };
    },
    sendPaymentRequest(state) {
      state.loadPayment = true;
    },
    updatePaymentData(state, action) {
      state.paymentData = action.payload.data;
    },
    getPaymentRes(state) {
      state.loadPayment = false;
    },
    emptyCartData(state) {
      state.cart = {
        data: [],
        isDataReceived: false,
        alertMsg: "",
        alertColor: "",
      };
    },
    updateFilterData(state, action) {
      const type = action.payload.type;
      const value = action.payload.filterValue;
      state.filterData = {
        ...state.filterData,
        [type]: value,
      };
    },
  },
});

export default cartSlice;

export const getSuggestion = (searchParam) => {
  return async (dispatch) => {
    try {
      dispatch(cartStoreAction.sendSearchRequest());
      const getData = await fetch(`${API_URL}store/search/${searchParam}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const response = await getData.json();
      dispatch(cartStoreAction.getSearchData({ data: response.data }));
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const clearSuggestion = () => {
  return (dispatch) => {
    const data = [];
    // console.log(data);
    dispatch(cartStoreAction.getSearchData({ data: data }));
  };
};
