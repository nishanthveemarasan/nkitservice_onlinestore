import { NavLink } from "react-router-dom";
import classes from "./NavPages.module.css";
const NavPages = () => {
  return (
    <NavLink to="/" className={`my-auto mx-3 ${classes.link}`}>
      Pages
    </NavLink>
  );
};
export default NavPages;
