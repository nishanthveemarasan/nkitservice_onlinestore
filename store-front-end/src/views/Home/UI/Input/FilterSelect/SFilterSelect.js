const SFilterSelect = (props) => {
  return (
    <div className="form-group">
      {props.label && (
        <label htmlFor={props.id} style={{ fontSize: "150%" }}>
          {props.label}
        </label>
      )}
      <select
        className={`form-control ${props.class}`}
        id={props.id}
        value={props.value}
        onChange={(e) => props.change(e, props.id)}
        disabled={props.readOnly && "readOnly"}
      >
        {props.chooseOption && <option value="">Default Filter Option</option>}
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.value.toLowerCase()}>
              {option.key}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SFilterSelect;
