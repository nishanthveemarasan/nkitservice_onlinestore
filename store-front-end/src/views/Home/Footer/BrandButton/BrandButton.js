import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";

const BrandButton = (props) => {
  return (
    <CButton className={`${props.brandClass} btn-brand mr-1 mb-1`}>
      <CIcon name={props.brandIcon} />
    </CButton>
  );
};
export default BrandButton;
