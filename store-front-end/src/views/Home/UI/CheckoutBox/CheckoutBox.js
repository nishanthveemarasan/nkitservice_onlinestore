import { NavLink } from "react-router-dom";
import SButton from "../SButton";
import CheckoutBoxItem from "./CheckoutBoxItem";

const CheckoutBox = (props) => {
  const cartData = props.data;
  const itemCount = cartData.length;
  const subTotalCount = cartData.reduce((acc, el) => acc + el.count, 0);
  const subTotalAmount = cartData.reduce((acc, el) => acc + el.totalPrice, 0);
  const subTotalDiscount = cartData.reduce(
    (acc, el) => acc + el.totalDiscount,
    0
  );
  const discount = subTotalDiscount;
  const deliveryCharge = Number.parseFloat("165.55");
  const total = subTotalAmount + deliveryCharge;

  return (
    <>
      <CheckoutBoxItem
        heading={props.heading}
        class="py-3 text-white"
        style={{ backgroundColor: "black", fontSize: "1.4rem" }}
      />
      <CheckoutBoxItem
        name="Item Count"
        value={itemCount}
        style={{ fontSize: "1.2rem" }}
      />
      <CheckoutBoxItem
        name="Total SubItems Count"
        value={subTotalCount}
        style={{ fontSize: "1.2rem" }}
      />
      <CheckoutBoxItem
        name="Sub Total Amount"
        value={`$${subTotalAmount.toFixed(2)}`}
        style={{ fontSize: "1.2rem" }}
      />
      <CheckoutBoxItem
        name="Discount"
        value={`-$${discount.toFixed(2)}`}
        style={{ fontSize: "1.2rem" }}
      />
      <CheckoutBoxItem name="Delevery Fee" value={`$${deliveryCharge}`} />
      <CheckoutBoxItem
        name="Total"
        value={`$${Number.parseFloat(total.toFixed(2))}`}
        class="bg-success py-3 text-white"
        style={{ borderRadius: "8px", fontSize: "1.2rem" }}
      />

      <div style={{ borderRadius: "4px" }}>
        <SButton
          name={props.buttonName ? props.buttonName : "Proceed to Checkout"}
          block={true}
          color="dark"
          class="py-3 font-weight-bolder"
          showName={true}
          fontSize="1.2rem"
          click={props.click}
          showSpinner={props.showSpinner}
          SpinnerSize={props.SpinnerSize}
          disabled={props.disabled}
        />
      </div>
      <div
        style={{
          textDecoration: "underline",
          fontSize: "100%",
          fontWeight: "normal",
          color: "black",
          textAlign: "center",
          marginTop: "3%",
        }}
      >
        <NavLink to="/">Continue Shopping</NavLink>
      </div>
    </>
  );
};
export default CheckoutBox;
