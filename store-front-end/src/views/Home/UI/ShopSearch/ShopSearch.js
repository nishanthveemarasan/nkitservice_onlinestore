import SInputGroup from "../Input/SInputGroup";
import SButton from "../SButton";
import Suggestion from "../SearchBox/Suggestion";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSuggestion } from "src/store/cart-slice";
import { getShopProductByName, getShopProducts } from "src/store/cart-reducer";
import { useHistory } from "react-router";
const ShopSearch = (props) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(false);
  const [clear, setClear] = useState(false);
  const [blur, setBlur] = useState(false);
  const history = useHistory();
  const mapStateToProps = (state) => {
    return {
      alertColor: state.cartStore.cart.alertColor,
      alertMsg: state.cartStore.cart.alertMsg,
      isSearching: state.cartStore.search.isLoading,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const onSearchHandler = (e) => {
    if (e.target.value.trim().length === 0 && type) {
      setType(false);
      dispatch(clearSuggestion());
      setClear(false);
      dispatch(getShopProducts());
    }
    setBlur(true);
    setSearch(e.target.value);
    setClear(true);
    setType(true);
  };
  useEffect(() => {
    let debounce;
    if (search.trim().length > 0 && clear) {
      debounce = setTimeout(() => {
        props.getSearchParam(search);
      }, 400);
    }
    return () => {
      clearTimeout(debounce);
    };
  }, [search, clear]);
  const onChangeSearchInputHandler = (data) => {
    // setBlur(true);
    setSearch(data);
    dispatch(getShopProductByName(data));
    dispatch(clearSuggestion());
    setClear(false);
  };

  return (
    <div className={`ml-1 mr-4 ${props.class}`}>
      <SInputGroup
        padding="2.5% 1%"
        placeholder="Search Product here"
        type="text"
        append={true}
        name="Search"
        showName={state.isSearching ? false : true}
        showSpinner={state.isSearching ? true : false}
        value={search}
        change={onSearchHandler}
      />
      <div className={props.autoComBox}>
        <Suggestion changeHandler={onChangeSearchInputHandler} />
      </div>
    </div>
  );
};
export default ShopSearch;
