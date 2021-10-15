import CartIcon from "./CartIcon";
import buttonClass from "./Navigation.module.css";
const CheckoutButton = (props) => {
  return (
    <>
      <button className={buttonClass.button} onClick={props.click}>
        <span className={buttonClass.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={buttonClass.badge}>{props.count}</span>
      </button>
    </>
  );
};
export default CheckoutButton;
