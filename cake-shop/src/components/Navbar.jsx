
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Load logged-in user
  useEffect(() => {
    const savedUser = localStorage.getItem("cakeUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // Check admin role
  const isAdmin =
    user?.role?.toLowerCase() === "admin";

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("cakeUser");
    localStorage.removeItem("cakeToken");

    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="elite-navbar">
      <div className="navbar-container">

        {/* Brand Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">🍰</span>

          <span className="brand-name">
            BCA
            <br />
            CAKE WALA
          </span>
        </Link>

        {/* Navigation Menu */}
        <div className="menu">

          <Link to="/" className="menu-link">
            HOME
          </Link>

          <span className="separator">|</span>

          <Link to="/catalog" className="menu-link">
            CATALOG
          </Link>

          <span className="separator">|</span>

          <Link
            to={user ? "/account" : "/login"}
            className="menu-link"
          >
            {user ? "ACCOUNT" : "LOGIN"}
          </Link>

          <span className="separator">|</span>

          <Link to="/orders" className="menu-link">
            MY ORDERS
          </Link>

          <span className="separator">|</span>

          <Link to="/contact" className="menu-link">
            CONTACT US
          </Link>

          <span className="separator">|</span>

          <Link to="/cart" className="menu-link">
            MY CART
          </Link>

          <span className="cart-count">
            {cartCount}
          </span>

          {/* Admin Dashboard */}
          {isAdmin && (
            <>
              <span className="separator">|</span>

              <Link
                to="/admin"
                className="menu-link"
              >
                ADMIN DASHBOARD
              </Link>
            </>
          )}

          {/* Logout */}
          {user && (
            <>
              <span className="separator">|</span>

              <button
                type="button"
                className="menu-link"
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                LOGOUT
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;