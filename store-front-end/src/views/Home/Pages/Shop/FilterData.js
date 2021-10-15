import { FILTER_SELECT_OPTION } from "./Data";
import { useState } from "react";
import SFilterSelect from "../../UI/Input/FilterSelect/SFilterSelect";
import SCard from "../../UI/card/SCard";
import ColorCheckBox from "../../UI/Shop/ColorCheckBox";
import HeightCheckBox from "../../UI/Shop/HeightCheckBox";
import classes from "./FilterData.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartStoreAction } from "src/store/store";
const FilterData = () => {
  const mapStateToProps = (state) => {
    return {
      filterData: state.cartStore.filterData,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [colorCollapsed, setcolorCollapsed] = useState(true);
  const [materialsCollapsed, setMaterialsCollapsed] = useState(true);
  const onFilterColorHeightChangeChandler = (e, value, type) => {
    const checked = e.target.checked;
    const copyArray = state.filterData[type].slice();
    if (checked) {
      copyArray.push(value);
      dispatch(
        cartStoreAction.updateFilterData({
          type,
          filterValue: copyArray,
        })
      );
    } else {
      const newArray = copyArray.filter((item, i) => item !== value);
      dispatch(
        cartStoreAction.updateFilterData({
          type,
          filterValue: newArray,
        })
      );
    }
  };
  const onFilterChangeHandler = (e, type) => {
    const value = e.target.value;
    dispatch(
      cartStoreAction.updateFilterData({
        type,
        filterValue: value,
      })
    );
  };
  const onSetCollapsedHandler = () => {
    setcolorCollapsed((prevState) => !prevState);
  };
  const onSetMaterialsCollapsedHandler = () => {
    setMaterialsCollapsed((prevState) => !prevState);
  };
  // console.log(filterSelect);
  return (
    <div className={`ml-1 mr-4 ${classes.filterSelectOption}`}>
      <div>
        <SFilterSelect
          options={FILTER_SELECT_OPTION}
          id="category"
          chooseOption={true}
          class={classes.filterSelect}
          value={state.filterData.category}
          change={onFilterChangeHandler}
        />
      </div>
      <SCard
        heading="FILTER BY COLOR"
        collapsed={colorCollapsed}
        onCollapsedHandler={onSetCollapsedHandler}
        showCollapsed={true}
      >
        <ColorCheckBox change={onFilterColorHeightChangeChandler} />
      </SCard>
      <SCard
        heading="FILTER BY HEIGHT"
        collapsed={materialsCollapsed}
        onCollapsedHandler={onSetMaterialsCollapsedHandler}
        showCollapsed={true}
      >
        <HeightCheckBox change={onFilterColorHeightChangeChandler} />
      </SCard>
    </div>
  );
};
export default FilterData;
