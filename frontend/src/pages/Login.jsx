import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      
      // Error handled by global interceptor
    }
  };

  return (
    <div className="container" style={{ marginTop: '10vh' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Log in to Spotify</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Email address</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" style={{ marginTop: '16px', marginBottom: '32px' }}>Log In</button>
      </form>
      <hr className="divider" style={{ margin: '24px 0' }} />
      <p style={{ color: 'var(--text-subdued)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--text-highlight)', textDecoration: 'underline' }}>Sign up for Spotify</Link>
      </p>
    </div>
  );
};

export default Login;
