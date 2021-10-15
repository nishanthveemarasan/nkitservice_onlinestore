import { useEffect } from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Shop.module.css";
import { getSuggestion } from "src/store/cart-slice";
import ProductItem from "../UI/Product/ProductItem";
import { getShopProducts } from "src/store/cart-reducer";
import SLoader from "../UI/Loader/SLoader";
import ShopSearch from "../UI/ShopSearch/ShopSearch";
import ShopPagination from "../UI/Shop/Pagination/ShopPagination";
import NewsLetter from "../UI/Shop/NewsLetter/NewsLetter";
import Category from "../UI/Shop/Category/Category";
import FilterData from "./Shop/FilterData";
import ShopCategory from "./Shop/ShopCategory/ShopCategory";

const Shop = () => {
  const mapStateToProps = (state) => {
    return {
      data: state.cartStore.shopData.data,
      alertColor: state.cartStore.cart.alertColor,
      alertMsg: state.cartStore.cart.alertMsg,
      isSearching: state.cartStore.search.isLoading,
      isDataReceived: state.cartStore.shopData.isDataReceived,
      filterData: state.cartStore.filterData,
    };
  };

  const dispatch = useDispatch();
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    // console.log(state.filterData);
    dispatch(getShopProducts(state.filterData));
  }, [dispatch, state.filterData]);

  const onGetSearchParamHandler = (param) => {
    dispatch(getSuggestion(param));
  };

  const onPageChangeHandler = (url) => {
    const params = url.split("?")[1];
    console.log(params);
  };

  return (
    <div>
      <CRow className={classes.topRow}>
        <CCol xs={1} sm={1} md={3}></CCol>
        <CCol xs={10} sm={10} md={6}>
          <ShopSearch
            class={classes.searchBox}
            autoComBox={classes.autoComBox}
            getSearchParam={onGetSearchParamHandler}
          />
        </CCol>
        <CCol xs={1} sm={1} md={3}></CCol>
      </CRow>
      {!state.isDataReceived && (
        <div className={classes.shopPage}>
          <SLoader />
        </div>
      )}
      {state.isDataReceived && (
        <>
          {/* <Category /> */}
          <ShopCategory />
          <CRow>
            <CCol sm={12} md={12} lg={3}>
              <FilterData />
            </CCol>
            <CCol sm={12} md={12} lg={9}>
              <CRow className="mr-2">
                {state.data.data.map((val, index) => {
                  return (
                    <CCol sm={12} md={4} lg={3} key={index}>
                      <ProductItem item={val} />
                    </CCol>
                  );
                })}
              </CRow>

              <CRow className="mr-2">
                <CCol sm={12} md={12}>
                  <ShopPagination
                    data={state.data}
                    pageChange={onPageChangeHandler}
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CContainer style={{ backgroundColor: "#fcf5f5" }}>
              <CRow className={`${classes.topRow}`}>
                <CCol sm={12} md={3}></CCol>
                <CCol sm={12} md={6}>
                  <NewsLetter />
                </CCol>
                <CCol sm={12} md={3}></CCol>
              </CRow>
            </CContainer>
          </CRow>
        </>
      )}
    </div>
  );
};
export default Shop;
