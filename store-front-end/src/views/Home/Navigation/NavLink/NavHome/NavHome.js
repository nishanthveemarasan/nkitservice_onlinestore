import { NavLink } from "react-router-dom";
import CheckoutButton from "../../CheckoutButton";
import classes from "./NavHome.module.css";
const NavHome = () => {
  return (
    <>
      <div className={`my-auto ${classes.dropDown}`}>
        <NavLink to="/" className={`my-auto ${classes.link}`}>
          Home
        </NavLink>
        <div className={classes.dropDownContent}>
          <p>fsdfsdf</p>
        </div>
      </div>
    </>
  );
};
export default NavHome;
