const CheckoutBoxItem = (props) => {
  return (
    <>
      {props.heading && (
        <>
          <div
            className={`clearfix font-weight-bolder ${props.class}`}
            style={props.style}
          >
            <div className="text-center ml-1 pl-2">{props.heading}</div>
          </div>
          <hr />
        </>
      )}
      {!props.heading && (
        <>
          <div
            className={`clearfix font-weight-bolder ${props.class}`}
            style={props.style}
          >
            <div className="float-left ml-1 pl-2">{props.name}</div>
            <div className="float-right mr-1 pr-2">{props.value}</div>
          </div>
          <hr />
        </>
      )}
    </>
  );
};
export default CheckoutBoxItem;
