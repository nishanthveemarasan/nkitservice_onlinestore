import React, { useState, useEffect } from "react";
import { CContainer, CRow, CCol } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./ProductCartItem.module.css";
import FormSelect from "../Input/FormSelect";
import SButton from "../SButton";
import { cartStoreAction } from "src/store/store";
import { useHistory } from "react-router";
import { addCartItems } from "src/store/cart-reducer";
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
  const [product, setProduct] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState("");
  useEffect(() => {
    console.log("hi");
    let productData = {
      id: 1,
      image_url:
        "http://nkservice.test/react-backend/storage/app/public/storeProduct/vienna-18-chair-black-hero.png",
      name: "Francois Bar Stool",
      color: ["black", "white", "yellow"],
      height: ["44cm", "68cm", "74cm"],
      description:
        "The Relax House Vienna Café chair is crafted from Beech wood and is presented here in black, the perfect contemporary café colour. Put this chair around the beatup tables in your trendy coffee house, or pair these chic restaurant dining chairs with cloth covered tables in your French bistro. Or put these dining chairs in your home kitchen or dining area for an affordable designer touch",
      price: 247.25,
      offer_price: 220.21,
    };
    console.log(productData, "hi");
    setProduct(productData);
    setColor(productData.color[0]);
    setHeight(productData.height[0]);
  }, [setProduct, setColor, setHeight]);
  // const findIndex = state.item.findIndex((el, i) => el.id === state.productId);
  // const product = state.item[params.id];
  // const [color, setColor] = useState(product.color[0]);
  // const [height, setHeight] = useState(product.height[0]);
  console.log(product);
  const colorChangeHandler = (e) => {
    const value = e.target.value;
    setColor(value);
  };
  const heightChangeHandler = (e) => {
    const value = e.target.value;
    setHeight(value);
  };

  const onCheckoutHandler = () => {
    history.push("/cart");
  };
  const dispatch = useDispatch();
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
      count: 1,
      unitPrice: price,
      discount: Number.parseFloat(discount.toFixed(2)),
    };
    dispatch(addCartItems(data));
  };
  const onGoBackHandler = () => {
    history.push("/");
  };
  return (
    <CContainer>
      <CRow>
        <CCol sm={12} md={6} lg={6}>
          {/* <div className={classes.parent}> */}
          <img src={product.image_url} className={classes.img} />
          {/* </div> */}
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
                  options={product.color}
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
                  options={product.height}
                  class={classes.chooseColor}
                  value={height}
                  change={heightChangeHandler}
                />
              </CCol>
            </CRow>
          </div>
          <div className={classes.colorDiv}>
            {/* <Counter productData={product} color={color} height={height} /> */}
            <SButton
              name="Add To Cart"
              block={false}
              color="dark"
              class="py-3 font-weight-bolder mr-2"
              showName={state.loading ? false : true}
              showSpinner={state.loading ? true : false}
              click={onAddCartHandler}
              width="30%"
            />
          </div>
          {state.cartData.length > 0 && (
            <SButton
              name="View Cart"
              block={false}
              color="dark"
              class="py-3 font-weight-bolder mr-2"
              showName={true}
              click={onCheckoutHandler}
              width="30%"
            />
          )}

          <SButton
            name="Back To Shop"
            block={false}
            color="dark"
            class="py-3 font-weight-bolder"
            showName={true}
            width="30%"
            click={onGoBackHandler}
          />
        </CCol>
      </CRow>
    </CContainer>
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
