import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { Spinner } from "react-bootstrap";

const SButton = (props) => {
  return (
    <CButton
      color={props.color}
      disabled={props.disabled}
      onClick={props.click}
      block={props.block}
      className={props.class}
      type={props.type}
      style={{ width: props.width, fontSize: props.fontSize }}
    >
      {props.showIcon && <CIcon name={props.iconName} />}
      {props.showIcon && props.name}
      {props.showSpinner && (
        <Spinner
          animation="border"
          role="status"
          size={props.SpinnerSize ? props.SpinnerSize : "sm"}
          className="mr-1"
        ></Spinner>
      )}
      {props.showName && !props.showSpinner && props.name}
    </CButton>
  );
};
export default SButton;
