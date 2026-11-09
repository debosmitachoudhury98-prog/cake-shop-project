 import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({
  cart,
  setCart,
  setOrders
}) {

  const navigate = useNavigate();


  const [customer, setCustomer] = useState({

    name: "",
    email: "",
    phone: "",
    address: ""

  });


  const total = cart.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );


  const handleChange = (event) => {

    const { name, value } = event.target;


    setCustomer({

      ...customer,

      [name]: value

    });

  };


  const placeOrder = () => {


    if (cart.length === 0) {

      alert("Your cart is empty!");

      return;

    }


    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {

      alert(
        "Please fill all customer details."
      );

      return;

    }


    const newOrder = {

      id:
        "EC" +
        Date.now()
          .toString()
          .slice(-6),

      date:
        new Date()
          .toLocaleDateString(),

      customer: customer,

      products: cart,

      total: total,

      status: "Order Placed"

    };


    // Add new order
    setOrders((previousOrders) => [

      newOrder,
      ...previousOrders

    ]);


    // Empty cart
    setCart([]);


    alert(
      "Order placed successfully!"
    );


    navigate("/orders");

  };


  if (cart.length === 0) {

    return (

      <div className="checkout-page">

        <div className="container py-5">

          <div className="checkout-box text-center">

            <h2>
              Your cart is empty
            </h2>

            <p>
              Please add products before checkout.
            </p>

            <button
              className="cart-btn"
              onClick={() =>
                navigate("/catalog")
              }
            >
              Go to Catalog
            </button>

          </div>

        </div>

      </div>

    );

  }


  return (

    <div className="checkout-page">

      <div className="container py-5">


        <h1 className="checkout-title">
          Checkout
        </h1>


        <div className="row g-4">


          {/* Customer Details */}

          <div className="col-md-7">

            <div className="checkout-box">

              <h3>
                Customer Details
              </h3>


              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Enter your delivery address"
                ></textarea>

              </div>

            </div>

          </div>


          {/* Order Summary */}

          <div className="col-md-5">

            <div className="checkout-box">

              <h3>
                Order Summary
              </h3>


              {cart.map((item) => (

                <div
                  className="checkout-product"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />


                  <div>

                    <h5>
                      {item.name}
                    </h5>

                    <p>
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                    <p>
                      $
                      {item.price *
                        item.quantity}
                    </p>

                  </div>

                </div>

              ))}


              <hr />


              <div className="checkout-total">

                <strong>
                  Total:
                </strong>

                <strong>
                  ${total}
                </strong>

              </div>


              <button
  type="button"
  className="place-order-btn"
  onClick={placeOrder}
>
  Submit Order
</button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Checkout;