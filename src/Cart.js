import { Link, useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
const Cart = ({ cart }) => {
  const [cartItems, setCartItems] = useState([]);

  // take the cartHash/token from the url
  const { cartHash } = useParams();

  useEffect(() => {
    // decode the cartHash and set it to cartItems state
    setCartItems(jwt.verify(cartHash, "secret_key").cart);
  }, [cartHash]);

  return (
    <>
      <Link to="/">Back to home</Link>
      <div style={styles.titleBar}>
        <h2>Cart</h2>
        <hr />
        {cartItems?.length ? (
          cartItems.map((item) => (
            <div style={styles.product} key={item.id}>
              <div>{item.title}</div> <b>${item.price}</b> || Quantity :{" "}
              {item.quantity}
            </div>
          ))
        ) : (
          <h3>No items in cart</h3>
        )}
        <hr />
        <b>
          Total price : $
          {cartItems
            ?.reduce((total, current) => {
              return total + current.price * current.quantity;
            }, 0)
            .toFixed(2)}
        </b>
        <br />
        <br />
        <p>Copy the below link and share your cart with your friends</p>
        <input type="text" value={window.location.href} />
      </div>
    </>
  );
};

export default Cart;

const styles = {
  product: {
    margin: "2rem 0",
    display: "flex",
    gap: "1rem",
    border: "1px solid #ccc",
    padding: "1rem",
    background: "#dda"
  },
  titleBar: {
    border: "1px solid #4a3ada",
    background: "#eaeaea",
    margin: "1rem",
    padding: "1rem"
  }
};
