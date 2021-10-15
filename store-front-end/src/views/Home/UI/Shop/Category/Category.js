import { CContainer } from "@coreui/react";
import classes from "./Category.module.css";
import img1 from "src/assets/images/chair.jfif";
import img2 from "src/assets/images/stool.jfif";
import img3 from "src/assets/images/office.jfif";
import CategoryItem from "./CategoryItem";

const CATEOGRY = [
  {
    img: img1,
    name: "CHAIRS",
  },
  {
    img: img2,
    name: "STOOLS",
  },
  {
    img: img3,
    name: "OFFICE CHAIRS",
  },
];
const Category = (props) => {
  return (
    <CContainer className={classes.container}>
      {CATEOGRY.map((item, i) => {
        return (
          <div className={classes.flexContainer} key={i}>
            <img src={item.img} />
            <div className={classes.info}>
              <div className={classes.title}>{item.name}</div>
              <button className={`btn btn-light`}>Shop Now</button>
            </div>
          </div>
        );
      })}
    </CContainer>
  );
};
export default Category;
