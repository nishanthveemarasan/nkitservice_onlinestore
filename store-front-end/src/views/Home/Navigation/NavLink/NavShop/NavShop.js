import { NavLink } from "react-router-dom";
import classes from "./NavShop.module.css";
const NavShop = () => {
  return (
    <NavLink to="/" className={`my-auto mx-3 ${classes.link}`}>
      Shop
    </NavLink>
  );
};
export default NavShop;
