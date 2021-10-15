import classes from "./CategoryItem.module.css";
const CategoryItem = (props) => {
  return (
    <div className={classes.flexContainer}>
      <img src={props.img} />
      <div className={classes.info}>
        <div className={classes.title}>{props.name}</div>
        <button className={`btn btn-light`}>Shop Now</button>
      </div>
    </div>
  );
};
export default CategoryItem;
