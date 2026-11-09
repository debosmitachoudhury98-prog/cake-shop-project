  import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {


  const increaseQuantity = (id) => {

    setCart((previousCart) =>

      previousCart.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item

      )

    );

  };


  const decreaseQuantity = (id) => {

    setCart((previousCart) =>

      previousCart
        .map((item) =>

          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item

        )
        .filter(
          (item) => item.quantity > 0
        )

    );

  };


  const removeProduct = (id) => {

    setCart((previousCart) =>

      previousCart.filter(
        (item) => item.id !== id
      )

    );

  };


  const total = cart.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );


  const totalItems = cart.reduce(

    (sum, item) =>
      sum + item.quantity,

    0

  );


  return (

    <div className="cart-page">

      <div className="container py-5">


        <h1 className="cart-title">
          My Cart
        </h1>


        {cart.length === 0 ? (

          <div className="cart-box empty-cart">

            <h3>
              Your cart is empty.
            </h3>

            <p>
              Add some delicious products to continue.
            </p>


            <Link
              to="/catalog"
              className="cart-btn"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <>

            {/* Cart Products */}

            <div className="cart-products">

              {cart.map((item) => (

                <div
                  className="cart-box cart-product-row"
                  key={item.id}
                >


                  {/* Image */}

                  <div className="cart-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  {/* Details */}

                  <div className="cart-details">

                    <p className="catalog-category">
                      {item.category.toUpperCase()}
                    </p>


                    <h2>
                      {item.name}
                    </h2>


                    <p className="cart-price">
                      ${item.price}
                    </p>


                    <p>
                      <strong>
                        Quantity:
                      </strong>


                      <button
                        className="quantity-btn"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>


                      <span className="quantity-number">
                        {item.quantity}
                      </span>


                      <button
                        className="quantity-btn"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </p>


                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeProduct(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>


                  {/* Product Total */}

                  <div className="cart-total">

                    <p>
                      Product Total
                    </p>

                    <h3>
                      $
                      {item.price *
                        item.quantity}
                    </h3>

                  </div>

                </div>

              ))}

            </div>


            {/* Cart Summary */}

            <div className="cart-summary">

              <div>

                <p>
                  Total Items:{" "}
                  <strong>
                    {totalItems}
                  </strong>
                </p>

                <h2>
                  Grand Total: ${total}
                </h2>

              </div>


              <div className="cart-summary-buttons">

                <Link
                  to="/catalog"
                  className="continue-shopping-btn"
                >
                  Continue Shopping
                </Link>


                <Link
                  to="/checkout"
                  className="cart-btn"
                >
                  Proceed to Checkout
                </Link>

              </div>

            </div>

          </>

        )}

      </div>

    </div>

  );
}

export default Cart;