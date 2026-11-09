import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(apiUrl("/user/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("cakeToken", data.token);
      localStorage.setItem("cakeUser", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      setMessage("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(apiUrl("/user"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name,
          last_name,
          mobile,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! Please login.");

      setIsRegister(false);
      setFirstName("");
      setLastName("");
      setMobile("");
      setPassword("");

    } catch (error) {
      setMessage("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "420px",
      margin: "60px auto",
      padding: "25px",
      border: "1px solid #ddd",
      borderRadius: "10px"
    }}>

      <h2 style={{ textAlign: "center" }}>
        {isRegister ? "Create Customer Account" : "Account Login"}
      </h2>

      <p style={{ textAlign: "center" }}>
        {isRegister
          ? "Register as a new customer"
          : "Login to your account"}
      </p>

      <form onSubmit={isRegister ? handleRegister : handleLogin}>

        {isRegister && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "12px", cursor: "pointer" }}
        >
          {loading
            ? "Please wait..."
            : isRegister
              ? "Register"
              : "Login"}
        </button>

      </form>

      {message && (
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          {message}
        </p>
      )}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        {isRegister
          ? "Already have an account? "
          : "New customer? "}

        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
          style={{
            border: "none",
            background: "none",
            color: "blue",
            cursor: "pointer"
          }}
        >
          {isRegister ? "Login Here" : "Create Account"}
        </button>
      </p>

    </div>
  );
}

export default Login;