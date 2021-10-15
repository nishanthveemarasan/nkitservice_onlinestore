import classes from "./ProductItem.module.css";
import { useHistory } from "react-router";
const ProductItem = (props) => {
  const history = useHistory();
  const item = props.item;
  const onPageChangeHandler = () => {
    history.push(`/product-item/${item.id}`);
  };
  return (
    <div className={classes.superParent}>
      <div className={classes.parent}>
        <img src={item.image_url} className={classes.img} />
        <button
          className={`btn btn-light ${classes.child}`}
          onClick={onPageChangeHandler}
        >
          Shop Now
        </button>
      </div>
      <div className={classes.title}>{item.name}</div>
      {getPrice(item)}
    </div>
  );
};
export default ProductItem;

const getPrice = (item) => {
  if (item.offer_price) {
    return (
      <h5 style={{ textAlign: "center" }}>
        {`$${item.offer_price} `}
        <small style={{ color: "red", fontSize: "15px" }}>
          <del>{`$${item.price} `}</del>
        </small>
      </h5>
    );
  } else {
    return <h5 style={{ textAlign: "center" }}>{`$${item.price} `}</h5>;
  }
};
