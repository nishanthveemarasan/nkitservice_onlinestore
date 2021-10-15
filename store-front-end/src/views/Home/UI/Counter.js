import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CButtonGroup } from "@coreui/react";
import SButton from "./SButton";
import { addCartItems, deductCartItems } from "src/store/cart-reducer";
import { cartStoreAction } from "src/store/store";
const Counter = (props) => {
  const [count, setCount] = useState(0);
  const mapStateToProps = (state) => {
    return {
      cartData: state.cartStore.cart.data,
      load: state.cartStore.loadCounter.name,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    if (state.cartData.length > 0) {
      const getItem = state.cartData.find(
        (el) => el.itemname === props.productData.itemname
      );
      if (getItem) {
        setCount(+getItem.count);
      }
    }
  }, [state.cartData, props.productData]);
  const dispatch = useDispatch();
  const addCounter = () => {
    const setCounter = count + 1;
    const data = {
      id: props.productData.id,
      itemname: props.productData.itemname,
      count: 1,
      unitPrice: Number.parseFloat(props.productData.price),
      discount: props.productData.discount,
    };
    setCount(setCounter);
    // dispatch(cartStoreAction.addProductToCart({ data }));
    dispatch(addCartItems(data));
  };
  const reductCounter = () => {
    if (count === 0) {
      return;
    } else {
      const setCounter = count - 1;
      const data = {
        id: props.productData.id,
        itemname: props.productData.itemname,
        count: 1,
        unitPrice: +props.productData.price,
        discount: props.productData.discount,
      };
      setCount(setCounter);
      // dispatch(cartStoreAction.reduceProductFromCart({ data }));
      dispatch(deductCartItems(data));
    }
  };
  return (
    <>
      <CButtonGroup>
        <SButton
          color="primary"
          disabled={false}
          name="+"
          click={addCounter}
          type="button"
          showIcon={false}
          showName={true}
        />
        <SButton
          color="secondary"
          disabled={true}
          name={count}
          showIcon={false}
          showName={props.productData.itemname === state.load ? false : true}
          showSpinner={props.productData.itemname === state.load ? true : false}
        />
        <SButton
          color="primary"
          disabled={false}
          name="-"
          click={reductCounter}
          type="button"
          showIcon={false}
          showName={true}
        />
      </CButtonGroup>
    </>
  );
};
export default Counter;
