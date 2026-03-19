import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Music for everyone.</h1>
      <p style={{ fontSize: '18px', color: 'var(--text-subdued)', maxWidth: '500px', marginBottom: '16px' }}>
        Millions of songs. No credit card needed. Join the movement today.
      </p>
      <div className="flex-gap">
        <Link to="/register" className="btn" style={{ width: 'auto' }}>GET SPOTIFY FREE</Link>
        <Link to="/login" className="btn btn-secondary" style={{ width: 'auto' }}>LOGIN</Link>
      </div>
    </div>
  );
};

export default Home;
