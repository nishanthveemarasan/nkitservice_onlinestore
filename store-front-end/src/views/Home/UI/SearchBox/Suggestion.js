import { useSelector, useDispatch } from "react-redux";
const Suggestion = (props) => {
  const mapStateToProps = (state) => {
    return {
      data: state.cartStore.search.data,
    };
  };
  const state = useSelector(mapStateToProps);
  const searchHandler = (e, el) => {
    props.changeHandler(el);
  };
  return (
    <>
      {state.data.length > 0 &&
        state.data.map((el, index) => {
          return (
            <li key={index} onClick={(e) => searchHandler(e, el.name)}>
              {el.name}
            </li>
          );
        })}
    </>
  );
};
export default Suggestion;
