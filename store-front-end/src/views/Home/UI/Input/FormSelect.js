const FormSelect = (props) => {
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
        onChange={props.change}
        disabled={props.readOnly && "readOnly"}
      >
        {props.chooseOption && <option>Choose One Option</option>}
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
