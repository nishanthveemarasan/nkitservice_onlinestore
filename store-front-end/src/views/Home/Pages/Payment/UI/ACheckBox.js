import { CFormGroup, CInputCheckbox, CLabel } from "@coreui/react";

const ACheckBox = (props) => {
  return (
    <CFormGroup variant="checkbox">
      <CInputCheckbox
        id="checkbox1"
        name="checkbox1"
        value="option1"
        style={props.style}
        checked={props.checked}
        onChange={(e) => props.change(e)}
      />
      <CLabel
        variant="checkbox"
        className="form-check-label ml-3"
        htmlFor="checkbox1"
        style={{ fontSize: "130%" }}
      >
        {props.label}
      </CLabel>
    </CFormGroup>
  );
};
export default ACheckBox;
