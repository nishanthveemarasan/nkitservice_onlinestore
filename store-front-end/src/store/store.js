import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import providerSlice from "./provider-slice";
import responsiveSlice from "./responsive-slice";

const store = configureStore({
  reducer: {
    responsiveStore: responsiveSlice.reducer,
    providerStore: providerSlice.reducer,
    cartStore: cartSlice.reducer,
  },
});

export const responsiveStoreAction = responsiveSlice.actions;
export const providerStoreAction = providerSlice.actions;
export const cartStoreAction = cartSlice.actions;
export default store;
