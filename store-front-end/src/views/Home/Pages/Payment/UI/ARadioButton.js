import { CFormGroup, CInputRadio, CLabel } from "@coreui/react";

const ARadioButton = (props) => {
  return (
    <CFormGroup variant="checkbox" className="mb-3">
      <CInputRadio
        className={`form-check-input ${props.radioClass}`}
        id={props.id}
        value={props.value}
        checked={props.checked}
        onChange={() => props.change(props.id)}
      />
      <CLabel variant="checkbox" htmlFor="radio1" className={props.labelClass}>
        {props.label}
      </CLabel>
    </CFormGroup>
  );
};
export default ARadioButton;
