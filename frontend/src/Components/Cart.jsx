import { useSelector, useDispatch } from "react-redux";
import {
  removeCartItem,
  clearCart,
  incItemQty,
  decItemQty,
} from "../Features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const Cart = () => {
  let [email, setEmail] = useState('')

  let sum = 0;
  let dispatch = useDispatch();
  
  let cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveCartItems = (e, items) => {
    e.preventDefault();
    dispatch(removeCartItem(items));
  };

  const handleClearCart = (e, items) => {
    e.preventDefault();
    dispatch(clearCart(items));
  };

  const handleIncQty = (e, item) => {
    e.preventDefault();
    dispatch(incItemQty(item));
  };

  const handleDecQty = (e, items) => {
    e.preventDefault();
    dispatch(decItemQty(items));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {

      if(!email){
        alert('Email is Required')
      }else{
      
      const body = {
        products: cartItems,
        email: email,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch("http://localhost:3000/paymentCheckout", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const stripe = await loadStripe(
        "pk_test_51PSYXCBeuBTxbWczzbDgIAt1tp56DoHqwty1iS5ejbcJaPot0A8TcPAXPRzrH3E47cntTsrvJp8UurDTByuyjJfW00Blabmwl4"
      );

      const session = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result) {
        setTimeout(() => {
          handleClearCart(e, cartItems);
        }, 1000);
      } else {
        console.log(result.error);
      }
    }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="cart-container">
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems.map(
              (cartItem) => (
                (sum += cartItem.quantity * cartItem.price),
                (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <img src={cartItem.image} alt={cartItem.name} />
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.desc}</p>
                        <button
                          onClick={(e) => {
                            handleRemoveCartItems(e, cartItem);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button
                        onClick={(e) => {
                          handleDecQty(e, cartItem);
                        }}
                      >
                        -
                      </button>
                      <div className="count">{cartItem.quantity}</div>
                      <button
                        onClick={(e) => {
                          handleIncQty(e, cartItem);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      ${cartItem.price * cartItem.quantity}
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <div className="cart-summary">
            <button
              className="clear-btn"
              onClick={(e) => {
                handleClearCart(e, cartItems);
              }}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Payable Amount</span>
                <span className="amount">${sum}</span>
              </div>
              <br />
              <div>
                Email : <input
                  type="email"
                  name="email"
                  placeholder="Please Enter Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <br />
              <button onClick={(e) => handleCheckout(e, cartItems)}>
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
