import SCheckBox from "../Input/SCheckBox";
import classes from "./ColorCheckBox.module.css";
import { useSelector } from "react-redux";
import { COLOR } from "../../Pages/Shop/Data";
const ColorCheckBox = (props) => {
  const mapStateToProps = (state) => {
    return {
      filterData: state.cartStore.filterData.color,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <>
      {COLOR.map((color, i) => {
        return (
          <div key={i} className={classes.parent}>
            <SCheckBox
              id={color}
              label={color}
              type="color"
              checkboxClass={classes.checkboxClass}
              labelClass={classes.labelClass}
              change={props.change}
              checked={state.filterData.includes(color)}
            />
          </div>
        );
      })}
    </>
  );
};
export default ColorCheckBox;
