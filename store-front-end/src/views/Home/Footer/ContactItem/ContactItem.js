import CIcon from "@coreui/icons-react";
import classes from "./ContactItem.module.css";
const ContactItem = (props) => {
  return (
    <div className={classes.item}>
      <CIcon name={props.iconName} className={classes.icon} />
      <span className={classes.description}>{props.info}</span>
    </div>
  );
};
export default ContactItem;
