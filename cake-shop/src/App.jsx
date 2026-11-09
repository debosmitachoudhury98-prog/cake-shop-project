
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
// Pages
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Catalog from "./components/Catalog";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import Account from "./components/Account";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cakeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("cakeOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cakeCart", JSON.stringify(cart));
  }, [cart]);

  // Save orders whenever they change
  useEffect(() => {
    localStorage.setItem("cakeOrders", JSON.stringify(orders));
  }, [orders]);

  // Calculate cart item count
  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  return (
    <BrowserRouter>
      {/* YOUR NAVBAR IS HERE */}
    <NavBar cartCount={cartCount} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
     <Route path="/login" element={<Login />} />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />

        {/* Main pages */}
        <Route path="/about" element={<About />} />
       
        <Route path="/catalog" element={<Catalog cart={cart} setCart={setCart} />} />

        {/* Product details */}
        <Route
          path="/product"
          element={<ProductDetails cart={cart} setCart={setCart} />}
        />

        {/* Cart and checkout */}
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} setOrders={setOrders} />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<Orders orders={orders} setOrders={setOrders} />}
        />


        {/* Page not found */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;