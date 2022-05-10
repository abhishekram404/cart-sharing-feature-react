import "./styles.css";
import { useEffect, useState } from "react";
import fakeProducts from "./fakeProducts";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cart from "./Cart";
import jwt from "jsonwebtoken";
export default function App() {
  const [cart, setCart] = useState([]);

  // the hash that will contain the cart items information
  const [cartHash, setCartHash] = useState("");

  // add to cart on button click
  const addToCart = (product) => {
    // if product already exists in cart, increment its quantity
    if (productAlreadyExistsInCart(product, cart)) {
      let cartCopy = [...cart];
      let index = cartCopy.findIndex((i) => i.id === product.id);
      cartCopy[index].quantity++;
      setCart(cartCopy);
      return;
    }

    // if the product doesn't already exist in cart then  add it to the cart
    setCart((prev) => [...cart, { ...product, quantity: 1 }]);
  };

  useEffect(() => {
    // generate token everytime when the cart changes
    // all the cart items are included inside this token
    setCartHash(jwt.sign({ cart }, "secret_key"));
  }, [cart]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            index
            element={
              <>
                <div style={styles.titleBar}>
                  <h1>Products</h1>
                  <Link to={`/cart/${cartHash}`} style={styles.cartButton}>
                    Cart :{" "}
                    {cart.reduce((total, current) => {
                      return total + current.quantity;
                    }, 0)}
                  </Link>
                </div>
                {fakeProducts.map((product) => (
                  <div style={styles.product} key={product.id}>
                    <div>{product.title}</div> <b>${product.price}</b>{" "}
                    <button onClick={() => addToCart(product)}>
                      Add to cart{" "}
                    </button>
                  </div>
                ))}
              </>
            }
          />
          <Route path={`/cart/:cartHash`} element={<Cart cart={cart} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// check if the product alread exists in cart
const productAlreadyExistsInCart = (product, cart) =>
  cart.some((item) => item.id === product.id);

const styles = {
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  cartButton: {
    border: "1px solid #dda",
    padding: "1.5rem 2rem",
    textDecoration: "none"
  },
  product: {
    margin: "2rem 0",
    display: "flex",
    gap: "1rem",
    border: "1px solid #ccc",
    padding: "1rem",
    background: "#dda"
  }
};
