import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCollapse,
} from "@coreui/react";
import SButton from "src/views/Home/UI/SButton";
const Accordian = (props) => {
  return (
    <CCard className="mb-0">
      <CCardHeader className="d-flex justify-content-between">
        <h5>{props.heading}</h5>
        {props.button.showButton && (
          <SButton
            name={props.button.name}
            block={false}
            color="primary"
            showName={true}
            click={props.button.click}
          />
        )}
      </CCardHeader>
      <CCardBody color="secondary">
        <CCollapse show={props.accordion}>
          <CCardBody>{props.children}</CCardBody>
        </CCollapse>
      </CCardBody>
    </CCard>
  );
};
export default Accordian;
