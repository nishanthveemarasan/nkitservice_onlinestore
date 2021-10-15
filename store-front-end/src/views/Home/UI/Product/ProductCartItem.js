import React, { useState, useEffect } from "react";
import { CContainer, CRow, CCol } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./ProductCartItem.module.css";
import FormSelect from "../Input/FormSelect";
import SButton from "../SButton";
import { useHistory } from "react-router";
import { addCartItems } from "src/store/cart-reducer";
import { API_URL } from "src/API/api";
import SLoader from "../Loader/SLoader";
import Page404 from "src/views/pages/page404/Page404";
const ProductCartItem = () => {
  const params = useParams();
  const history = useHistory();
  const mapStateToProps = (state) => {
    return {
      item: state.cartStore.storeData,
      cartData: state.cartStore.cart.data,
      loading: state.cartStore.loadCounter.name,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [colorArray, setColorArray] = useState([]);
  const [heightArray, setHeightArray] = useState([]);
  const [color, setColor] = useState("black");
  const [height, setHeight] = useState("46cm");
  const [sendRequest, setSendRequest] = useState(false);
  useEffect(async () => {
    setLoading(true);
    try {
      const sendRequest = await fetch(
        `${API_URL}store/get-product/${params.id}`
      );
      const response = await sendRequest.json();
      const productData = response.data;
      const productColor = productData.color;
      const productHeight = productData.height;
      setProduct(productData);
      setLoading(false);
      setSendRequest(true);
      setColorArray(productColor.split(","));
      setHeightArray(productHeight.split(","));
    } catch (error) {
      console.log(error.response);
    }
  }, [setProduct, setColorArray, setHeightArray, setLoading, setSendRequest]);
  const colorChangeHandler = (e) => {
    const value = e.target.value;
    setColor(value);
  };
  const heightChangeHandler = (e) => {
    const value = e.target.value;
    setHeight(value);
  };
  const onGoBackHandler = () => {
    history.push("/");
  };
  const onCheckoutHandler = () => {
    history.push("/cart");
  };
  const onAddCartHandler = () => {
    let actualPrice = Number.parseFloat(product.price);
    let price = actualPrice;
    let discount = 0;
    if (product.offer_price) {
      price = Number.parseFloat(product.offer_price);
      discount = actualPrice - price;
    }
    const data = {
      id: product.id,
      itemname: `${product.name}-${height}(${color})`,
      image_url: product.image_url,
      count: 1,
      unitPrice: price,
      discount: Number.parseFloat(discount.toFixed(2)),
    };
    dispatch(addCartItems(data));
  };
  return (
    <div
    // style={{
    //   marginTop: "60px",
    //   position: "absolute",
    //   zIndex: "-1",
    // }}
    >
      {loading && (
        <div style={{ height: "100vh" }}>
          <SLoader />
        </div>
      )}
      {sendRequest && product.length === 0 && <Page404 />}
      {sendRequest && product && (
        <CContainer>
          <CRow>
            <CCol sm={12} md={6} lg={6}>
              <img src={product.image_url} className={classes.img} />
            </CCol>
            <CCol sm={12} md={6} lg={6}>
              <h1>{product.name}</h1>
              <div className={classes.productDescription}>
                {product.description}
              </div>
              <h1>{getPrice(product)}</h1>
              <div className={classes.colorDiv}>
                <CRow>
                  <CCol sm={12} md={6}>
                    <FormSelect
                      md={12}
                      sm={12}
                      label="Color"
                      id="color"
                      options={colorArray}
                      class={classes.chooseColor}
                      value={color}
                      change={colorChangeHandler}
                    />
                  </CCol>

                  <CCol sm={12} md={6}>
                    <FormSelect
                      md={12}
                      sm={12}
                      label="Height"
                      id="height"
                      options={heightArray}
                      class={classes.chooseColor}
                      value={height}
                      change={heightChangeHandler}
                    />
                  </CCol>
                </CRow>
              </div>
              <div className={classes.colorDiv}>
                <SButton
                  name="Add To Cart"
                  block={false}
                  color="dark"
                  // class="py-3 font-weight-bolder mr-2"
                  showName={state.loading ? false : true}
                  showSpinner={state.loading ? true : false}
                  click={onAddCartHandler}
                  class={classes.button}
                />
              </div>
              {state.cartData.length > 0 && (
                <SButton
                  name="View Cart"
                  block={false}
                  color="dark"
                  // class="py-3 font-weight-bolder mr-2"
                  showName={true}
                  click={onCheckoutHandler}
                  class={classes.button}
                />
              )}

              <SButton
                name="Back To Shop"
                block={false}
                color="dark"
                // class="py-3 font-weight-bolder"
                showName={true}
                class={classes.button}
                click={onGoBackHandler}
              />
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  );
};
export default React.memo(ProductCartItem);
const getPrice = (item) => {
  if (item.offer_price) {
    return (
      <>
        {`$${item.offer_price} `}
        <small style={{ color: "red", fontSize: "20px" }}>
          <del>{`$${item.price} `}</del>
        </small>
      </>
    );
  } else {
    return <>{`$${item.price} `}</>;
  }
};
