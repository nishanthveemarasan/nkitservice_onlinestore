import { CCol, CRow } from "@coreui/react";
import classes from "./OrderItems.module.css";
const OrderItems = (props) => {
  const data = props.data;
  const item = data.itemname.split("-");
  return (
    <>
      <CRow className="mb-1">
        <CCol sm={12} md={3} lg={3} className={`d-flex ${classes.colSize}`}>
          <img
            src={data.image_url}
            className={`mx-auto my-auto ${classes.cartImg}`}
          />
        </CCol>
        <CCol sm={12} md={3} lg={3} className={`d-flex ${classes.colSize}`}>
          <span
            className="mx-auto my-auto font-italic font-weight-bolder"
            style={{ fontSize: "130%" }}
          >
            {item[0]}
          </span>
        </CCol>
        <CCol sm={12} md={2} lg={2} className={`d-flex ${classes.colSize}`}>
          <span
            className="mx-auto my-auto font-italic font-weight-bolder"
            style={{ fontSize: "130%" }}
          >
            {item[1]}
          </span>
        </CCol>
        <CCol sm={12} md={1} lg={1} className={`d-flex ${classes.colSize}`}>
          <span
            className="mx-auto my-auto font-italic font-weight-bolder"
            style={{ fontSize: "130%" }}
          >
            {item[2]}
          </span>
        </CCol>
        <CCol sm={12} md={1} lg={1} className={`d-flex ${classes.colSize}`}>
          <span
            className="mx-auto my-auto font-italic font-weight-bolder"
            style={{ fontSize: "130%" }}
          >
            {data.count}
          </span>
        </CCol>
        <CCol sm={12} md={2} lg={2} className={`d-flex ${classes.colSize}`}>
          <span
            className="mx-auto my-auto font-italic font-weight-bolder"
            style={{ fontSize: "130%" }}
          >
            {data.totalPrice}
          </span>
        </CCol>
      </CRow>
    </>
  );
};
export default OrderItems;
