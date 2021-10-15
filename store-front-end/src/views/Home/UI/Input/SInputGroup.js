import { CInputGroup, CInput, CInputGroupAppend } from "@coreui/react";
import { Spinner } from "react-bootstrap";
import SButton from "../SButton";
const SInputGroup = (props) => {
  return (
    <CInputGroup>
      <CInput
        type={props.type}
        placeholder={props.placeholder}
        style={{
          padding: props.padding,
          width: props.width,
          fontWeight: props.weight,
        }}
        value={props.value}
        onChange={props.change}
        onBlur={props.blur}
      />
      {props.append && (
        <CInputGroupAppend>
          <button
            style={{
              color: "white",
              paddingRight: "10px",
              backgroundColor: "blue",
              border: "none",
              paddingLeft: "10px",
              minWidth: "130%",
            }}
          >
            {props.showSpinner && (
              <Spinner
                animation="border"
                role="status"
                size={props.SpinnerSize ? props.SpinnerSize : "sm"}
                className="mr-1"
              ></Spinner>
            )}
            {props.showName && props.name}
          </button>
          {/* <SButton
            name={props.name}
            color={props.color}
            showName={props.showName}
            showSpinner={props.showSpinner}
          /> */}
        </CInputGroupAppend>
      )}
    </CInputGroup>
  );
};
export default SInputGroup;
