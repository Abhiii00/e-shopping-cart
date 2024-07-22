import { products } from "../data";
import { addToCart } from "../Features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.cartItems);


  const handleAddtoCart = (item) => {
    dispatch(addToCart(item));
  };


 // it will check if item already added in the cart
 
  const isInCart = (item) => {
    return cartItems.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <>
      <div className="products-container">
        {products.map((item) => {
          return (
            <div className="products">
              <img src={item.image} alt="image" />
              <h2>{item.title}</h2>
              <h3>{item.price}</h3>

              <div className="addtocart-btn">
                {isInCart(item) ? (
                  <Link to="/cart">
                    <button>Go to Cart</button>
                  </Link>
                ) : (
                  <button onClick={() => handleAddtoCart(item)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
