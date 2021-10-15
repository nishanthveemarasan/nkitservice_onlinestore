import { Spinner } from "react-bootstrap";
import classes from "./SSpinner.module.css";
const SSpinner = (props) => {
  return (
    <div className={classes.spinner}>
      <Spinner
        animation="border"
        role="status"
        size={props.size}
        variant={props.color}
      ></Spinner>
    </div>
  );
};
export default SSpinner;
