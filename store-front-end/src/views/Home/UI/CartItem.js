import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import img from "../../../assets/images/vienna-18-chair-black-hero.png";
import classes from "../Home.module.css";
import cartItemClasses from "./CartItem.module.css";
import Counter from "./Counter";
const CartItem = (props) => {
  const product = props.item;

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex">
          <img
            src={img}
            alt="Product"
            className={`mx-auto ${cartItemClasses.cartItemImg}`}
          />
        </div>
      </CCardHeader>
      <CCardBody>
        <div className="text-center font-italic font-weight-bolder">
          <p className="">{product.itemname}</p>
          <p className={classes.price}>{`${product.price}`}</p>
          <p
            className={
              +product.count > 0 ? classes.inStockStyle : classes.outStockStyle
            }
          >
            {+product.count > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <Counter productData={product} />
        </div>
      </CCardBody>
    </CCard>
  );
};
export default CartItem;
