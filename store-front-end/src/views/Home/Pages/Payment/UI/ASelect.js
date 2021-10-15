import { CCol, CFormGroup, CLabel, CSelect } from "@coreui/react";

const ASelect = (props) => {
  return (
    <CCol sm={props.size.sm} md={props.size.md} lg={props.size.lg}>
      <CFormGroup>
        <CLabel htmlFor="ccyear" className={props.styleLabel}>
          {props.label}
        </CLabel>
        <CSelect custom name="ccyear" id="ccyear" className={props.styleInput}>
          {props.options.map((option, index) => {
            return (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            );
          })}
        </CSelect>
      </CFormGroup>
    </CCol>
  );
};
export default ASelect;
