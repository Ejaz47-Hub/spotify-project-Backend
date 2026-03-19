import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, role);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      // Error handled by global interceptor
    }
  };

  return (
    <div className="container" style={{ marginTop: '10vh' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Sign up for free to start listening.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>What should we call you?</label>
          <input
            type="text"
            placeholder="Enter a profile name."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>What's your email?</label>
          <input
            type="email"
            placeholder="Enter your email."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Create a password</label>
          <input
            type="password"
            placeholder="Create a password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Account Type</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
          >
            <option value="user">Listener (User)</option>
            <option value="artist">Creator (Artist)</option>
          </select>
        </div>
        <button type="submit" className="btn" style={{ marginTop: '16px', marginBottom: '32px' }}>Sign up</button>
      </form>
      <hr className="divider" style={{ margin: '24px 0' }} />
      <p style={{ color: 'var(--text-subdued)' }}>
        Have an account? <Link to="/login" style={{ color: 'var(--text-highlight)', textDecoration: 'underline' }}>Log in.</Link>
      </p>
    </div>
  );
};

export default Register;
