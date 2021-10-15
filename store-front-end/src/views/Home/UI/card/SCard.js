import { CCard, CCardBody, CCardHeader, CCollapse, CLink } from "@coreui/react";
import CIcon from "@coreui/icons-react";
const SCard = (props) => {
  return (
    <CCard>
      <CCardHeader color="success">
        <span style={{ color: "white", fontWeight: "bolder" }}>
          {props.heading}
        </span>
        {props.showCollapsed && (
          <div className="card-header-actions">
            <CLink
              className="card-header-action"
              onClick={props.onCollapsedHandler}
            >
              <CIcon
                name={
                  props.collapsed ? "cil-chevron-bottom" : "cil-chevron-top"
                }
                style={{ color: "white" }}
              />
            </CLink>
          </div>
        )}
      </CCardHeader>
      <CCollapse show={props.collapsed}>
        <CCardBody>{props.children}</CCardBody>
      </CCollapse>
    </CCard>
  );
};
export default SCard;
