import { CFormGroup, CInputCheckbox, CLabel } from "@coreui/react";
const SCheckBox = (props) => {
  return (
    <CFormGroup variant="checkbox">
      <CInputCheckbox
        id={props.id}
        name="checkbox1"
        value={props.value}
        className={props.checkboxClass}
        checked={props.checked}
        onChange={(e) => props.change(e, props.id, props.type)}
      />
      <CLabel
        variant="checkbox"
        className="form-check-label"
        htmlFor="checkbox1"
        className={props.labelClass}
      >
        {props.label}
      </CLabel>
    </CFormGroup>
  );
};
export default SCheckBox;
