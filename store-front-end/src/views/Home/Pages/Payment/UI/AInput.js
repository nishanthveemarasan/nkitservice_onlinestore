import { CCol } from "@coreui/react";
import { Form } from "react-bootstrap";

const AInput = (props) => {
  return (
    <CCol sm={props.size.sm} md={props.size.md} lg={props.size.lg}>
      <Form.Group>
        <Form.Label className={props.styleLabel}>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          className={props.styleInput}
          value={props.value}
          onChange={(e) => props.change(e, props.id)}
          onBlur={(e) => props.blur(e, props.id)}
          placeholder={props.placeHolder}
        />
      </Form.Group>
    </CCol>
  );
};
export default AInput;
