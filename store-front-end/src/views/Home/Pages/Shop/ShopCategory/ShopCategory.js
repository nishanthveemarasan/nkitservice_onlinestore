import classes from "./ShopCategory.module.css";
import { SHOP_CATEOGRY } from "../Data";
import { CContainer } from "@coreui/react";
import { useHistory } from "react-router";
const ShopCategory = (props) => {
  const history = useHistory();
  const onHomePageHandler = () => {
    history.push("/");
  };
  return (
    <CContainer className={classes.container}>
      {SHOP_CATEOGRY.map((item, i) => {
        return (
          <div className={classes.flexItem} key={i}>
            <img className={classes.flexImg} src={item.img} />
            <div className={classes.info}>
              <p className={classes.title}>{item.name}</p>
              <button className="btn btn-light" onClick={onHomePageHandler}>
                Shop Now
              </button>
            </div>
          </div>
        );
      })}
    </CContainer>
  );
};
export default ShopCategory;
