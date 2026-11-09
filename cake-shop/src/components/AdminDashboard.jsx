import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiUrl } from "../api";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("cakeUser") || "null");
  const token = localStorage.getItem("cakeToken");

  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [messageLoading, setMessageLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const [messageError, setMessageError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [productError, setProductError] = useState("");

  const [updatingOrder, setUpdatingOrder] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);

  const emptyProduct = {
    name: "",
    category: "",
    price: "",
    image: "",
    description: ""
  };

  const [productForm, setProductForm] = useState(emptyProduct);

  const emptyAdmin = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  const [adminForm, setAdminForm] = useState(emptyAdmin);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [adminError, setAdminError] = useState("");

  const statuses = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ];

  const loadProducts = async () => {
    setProductLoading(true);
    setProductError("");

    try {
      const response = await fetch(apiUrl("/product"));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data);
    } catch (err) {
      setProductError(err.message);
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin" || !token) return;

    const fetchMessages = async () => {
      setMessageLoading(true);
      setMessageError("");

      try {
        const response = await fetch(apiUrl("/contact"), {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load messages");
        }

        setMessages(data);
      } catch (err) {
        setMessageError(err.message);
      } finally {
        setMessageLoading(false);
      }
    };

    const fetchOrders = async () => {
      setOrderLoading(true);
      setOrderError("");

      try {
        const response = await fetch(apiUrl("/order"), {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load orders");
        }

        setOrders(data);
      } catch (err) {
        setOrderError(err.message);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchMessages();
    fetchOrders();
    loadProducts();
  }, [token, user?.role]);

  // HANDLE PRODUCT INPUT
  const handleProductInput = (e) => {
    const { name, value } = e.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // HANDLE ADMIN INPUT
  const handleAdminInput = (e) => {
    const { name, value } = e.target;

    setAdminForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // CREATE NEW ADMIN
  const createAdmin = async (e) => {
    e.preventDefault();
    setSavingAdmin(true);
    setAdminError("");

    try {
      const response = await fetch(
        apiUrl("/user/create-admin"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(adminForm)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Admin creation failed");
      }

      setAdminForm(emptyAdmin);
      alert("New Admin created successfully!");

    } catch (err) {
      setAdminError(err.message);
    } finally {
      setSavingAdmin(false);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    setProductError("");

    try {
      const isEditing = Boolean(editingProductId);

      const response = await fetch(
        isEditing
          ? apiUrl(`/product/${editingProductId}`)
          : apiUrl("/product"),
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...productForm,
            price: Number(productForm.price)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save product");
      }

      setProductForm(emptyProduct);
      setEditingProductId(null);
      await loadProducts();

      alert(isEditing
        ? "Product updated successfully!"
        : "Product added successfully!"
      );

    } catch (err) {
      setProductError(err.message);
    } finally {
      setSavingProduct(false);
    }
  };

  const editProduct = (product) => {
    setEditingProductId(product._id);

    setProductForm({
      name: product.name || "",
      category: product.category || "",
      price: String(product.price ?? ""),
      image: product.image || "",
      description: product.description || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setProductForm(emptyProduct);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        apiUrl(`/product/${id}`),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product deletion failed");
      }

      setProducts((previous) =>
        previous.filter((product) => product._id !== id)
      );

      if (editingProductId === id) {
        cancelEdit();
      }

      alert("Product deleted successfully!");

    } catch (err) {
      setProductError(err.message);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/contact/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setMessages((previous) =>
        previous.filter((message) => message._id !== id)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const updateOrderStatus = async (id, status) => {
    setUpdatingOrder(id);
    setOrderError("");

    try {
      const response = await fetch(
        apiUrl(`/order/${id}/status`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === id ? data.order : order
        )
      );

      alert("Order status updated successfully!");
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setUpdatingOrder("");
    }
  };

  if (!user || user.role !== "admin" || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.first_name}!</p>

      <hr />

      <h2>Manage Products ({products.length})</h2>

      <form
        onSubmit={saveProduct}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "25px",
          borderRadius: "8px"
        }}
      >
        <h3>{editingProductId ? "Edit Product" : "Add New Product"}</h3>

        <input
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleProductInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          name="category"
          placeholder="Category"
          value={productForm.category}
          onChange={handleProductInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={productForm.price}
          onChange={handleProductInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          name="image"
          placeholder="Image URL or image path"
          value={productForm.image}
          onChange={handleProductInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={productForm.description}
          onChange={handleProductInput}
          rows="4"
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <button type="submit" disabled={savingProduct}>
          {savingProduct
            ? "Saving..."
            : editingProductId
              ? "Update Product"
              : "Add Product"}
        </button>

        {editingProductId && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {productError && (
        <p style={{ color: "red" }}>{productError}</p>
      )}

      {productLoading && <p>Loading products...</p>}

      {!productLoading && products.length === 0 && (
        <p>No products found.</p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover"
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>
            <p>{product.description}</p>

            <button onClick={() => editProduct(product)}>
              Edit
            </button>

            <button
              onClick={() => deleteProduct(product._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <hr />

      <h2>Manage Orders ({orders.length})</h2>
      <hr />

      <h2>Manage Admins</h2>
      <p>Create another administrator account.</p>

      <form
        onSubmit={createAdmin}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "25px",
          borderRadius: "8px"
        }}
      >
        <input
          name="first_name"
          placeholder="First Name"
          value={adminForm.first_name}
          onChange={handleAdminInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={adminForm.last_name}
          onChange={handleAdminInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          value={adminForm.email}
          onChange={handleAdminInput}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          name="password"
          type="password"
          placeholder="New Admin Password"
          value={adminForm.password}
          onChange={handleAdminInput}
          required
          minLength="6"
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <button type="submit" disabled={savingAdmin}>
          {savingAdmin ? "Creating..." : "Create Admin Account"}
        </button>

        {adminError && (
          <p style={{ color: "red" }}>{adminError}</p>
        )}
      </form>

      <hr />

      {orderLoading && <p>Loading orders...</p>}

      {orderError && (
        <p style={{ color: "red" }}>{orderError}</p>
      )}

      {!orderLoading && !orderError && orders.length === 0 && (
        <p>No customer orders found.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px"
          }}
        >
          <h3>Order ID: {order.orderId}</h3>

          <p><strong>Customer:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>

          <h4>Ordered Products</h4>

          {order.products.map((product, index) => (
            <div key={index}>
              <p>
                {product.name} - Quantity: {product.quantity} -
                Price: ₹{product.price}
              </p>
            </div>
          ))}

          <h3>Total: ₹{order.total}</h3>

          <p>
            <strong>Current Status:</strong> {order.status}
          </p>

          <label>Update Order Status: </label>

          <select
            value={order.status}
            disabled={updatingOrder === order._id}
            onChange={(e) =>
              updateOrderStatus(order._id, e.target.value)
            }
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {updatingOrder === order._id && (
            <p>Updating status...</p>
          )}
        </div>
      ))}

      <hr />

      <h2>Customer Messages ({messages.length})</h2>

      {messageLoading && <p>Loading messages...</p>}

      {messageError && (
        <p style={{ color: "red" }}>{messageError}</p>
      )}

      {!messageLoading && !messageError && messages.length === 0 && (
        <p>No customer messages found.</p>
      )}

      {messages.map((message) => (
        <div
          key={message._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          <h3>{message.name}</h3>
          <p>Email: {message.email}</p>
          <p>Phone: {message.phone}</p>
          <p>Message: {message.message}</p>

          <button onClick={() => deleteMessage(message._id)}>
            Delete Message
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;