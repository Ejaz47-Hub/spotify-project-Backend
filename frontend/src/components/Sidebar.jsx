import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, PlusSquare, Heart, LogOut, PlusCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
              <Home size={24} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link">
              <Search size={24} />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link">
              <Library size={24} />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-actions">
        <h3>Playlists</h3>
        <ul>
          <li>
            <Link to="/upload" className={`nav-link ${isActive('/upload') ? 'active' : ''}`}>
              <div className="icon-bg icon-create">
                <PlusSquare size={14} color="#000" />
              </div>
              <span>Upload Music</span>
            </Link>
          </li>
          {user?.role === 'artist' && (
            <li>
              <Link to="/create-album" className={`nav-link ${isActive('/create-album') ? 'active' : ''}`}>
                <div className="icon-bg" style={{ backgroundColor: '#b3b3b3' }}>
                  <PlusCircle size={14} color="#000" />
                </div>
                <span>Create Album</span>
              </Link>
            </li>
          )}
          <li>
            <Link to="#" className="nav-link">
              <div className="icon-bg icon-liked">
                <Heart size={14} color="#fff" />
              </div>
              <span>Liked Songs</span>
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 'auto', padding: '0 12px' }}>
        <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: '12px' }}>
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </div>

      <hr className="divider" />
    </div>
  );
};

export default Sidebar;
