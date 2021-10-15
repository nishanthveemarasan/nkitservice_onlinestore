import { createSlice } from "@reduxjs/toolkit";
import API from "src/axios/axios";
import { providerStoreAction } from "./store";

const initialState = {
  providerData: [],
  isDataChanged: false,
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    getData(state, action) {
      state.providerData = action.payload.val;
    },
  },
});

export default providerSlice;

export const getProviderData = () => {
  return (dispatch) => {
    API.get("provider/get")
      .then((response) => {
        if (response.data.http_status === 200) {
          dispatch(providerStoreAction.getData({ val: response.data.data }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
