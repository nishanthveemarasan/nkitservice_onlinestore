import classes from "./LinkItem.module.css";
const LinkItem = (props) => {
  return <div className={`mb-2 ${classes.linkItem}`}>{props.item}</div>;
};
export default LinkItem;
