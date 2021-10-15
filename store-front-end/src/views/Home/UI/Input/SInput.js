import {
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInput,
} from "@coreui/react";
import SButton from "../SButton";
const SInput = (props) => {
  return (
    <CFormGroup row>
      <CInputGroup>
        <CInputGroupPrepend>
          <SButton
            type="button"
            color="primary"
            showIcon={true}
            iconName="cil-magnifying-glass"
            name="Search"
          />
        </CInputGroupPrepend>
        <CInput
          id="input1-group2"
          name="input1-group2"
          placeholder="Search Items"
          style={{ padding: "2.5% 1%" }}
          list={props.list}
        />
        <CInputGroupAppend>
          <SButton type="button" color="primary" showIcon={false} name="X" />
        </CInputGroupAppend>
      </CInputGroup>
    </CFormGroup>
  );
};
export default SInput;
