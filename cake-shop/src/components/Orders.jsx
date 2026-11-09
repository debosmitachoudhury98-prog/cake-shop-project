
import React from "react";

function Orders({ orders = [], setOrders }) {
  // Remove an order
  const removeOrder = (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this order?"
    );

    if (!confirmDelete) return;

    setOrders((previousOrders) =>
      previousOrders.filter((order) => order.id !== orderId)
    );
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "Date not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No Orders Yet!</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>Placed on: {formatDate(order.date)}</p>
                </div>

                <span className="order-status">
                  {order.status || "Order Placed"}
                </span>
              </div>

              <div className="order-products">
                {order.products?.map((product, index) => (
                  <div
                    className="order-product"
                    key={`${product.id || product.name}-${index}`}
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="order-product-image"
                      />
                    )}

                    <div className="order-product-info">
                      <h4>{product.name}</h4>

                      <p>
                        Price: ₹{Number(product.price || 0).toFixed(2)}
                      </p>

                      <p>Quantity: {product.quantity || 1}</p>
                    </div>

                    <div className="order-product-total">
                      ₹
                      {(
                        Number(product.price || 0) *
                        Number(product.quantity || 1)
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {order.customer && (
                <div className="order-customer">
                  <h4>Delivery Details</h4>

                  <p>
                    <strong>Name:</strong> {order.customer.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.customer.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.customer.phone}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.customer.address}
                  </p>
                </div>
              )}

              <div className="order-bottom">
                <h3>
                  Total: ₹{Number(order.total || 0).toFixed(2)}
                </h3>

                <button
                  type="button"
                  className="remove-order-btn"
                  onClick={() => removeOrder(order.id)}
                >
                  Remove Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
