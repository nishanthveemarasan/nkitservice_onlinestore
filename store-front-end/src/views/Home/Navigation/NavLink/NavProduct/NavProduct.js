import { NavLink } from "react-router-dom";
import classes from "./NavProduct.module.css";
const NavProduct = () => {
  return (
    <NavLink to="/" className={`my-auto mx-3 ${classes.link}`}>
      Products
    </NavLink>
  );
};
export default NavProduct;
