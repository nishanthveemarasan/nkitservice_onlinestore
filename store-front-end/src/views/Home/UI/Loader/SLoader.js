import { CSpinner } from "@coreui/react";
import classes from "./SLoader.module.css";
const SLoader = (props) => {
  return (
    <div className={props.class ? props.class : classes.spinner}>
      <CSpinner color="primary" variant="grow" size="lg" />
    </div>
  );
};
export default SLoader;
