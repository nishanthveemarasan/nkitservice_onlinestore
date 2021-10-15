import SCheckBox from "../Input/SCheckBox";
import classes from "./ColorCheckBox.module.css";
import { useSelector } from "react-redux";
import { HEIGHT } from "../../Pages/Shop/Data";
const HeightCheckBox = (props) => {
  const mapStateToProps = (state) => {
    return {
      filterData: state.cartStore.filterData.height,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <>
      {HEIGHT.map((height, i) => {
        return (
          <div key={i} className={classes.parent}>
            <SCheckBox
              id={height}
              label={height}
              checkboxClass={classes.checkboxClass}
              labelClass={classes.labelClass}
              change={props.change}
              type="height"
              checked={state.filterData.includes(height)}
            />
          </div>
        );
      })}
    </>
  );
};
export default HeightCheckBox;
