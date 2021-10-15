import { NavLink } from "react-router-dom";
import classes from "./NavFeatures.module.css";
const NavFeatures = () => {
  return (
    <NavLink to="/" className={`my-auto mx-3 ${classes.link}`}>
      Features
    </NavLink>
  );
};
export default NavFeatures;
