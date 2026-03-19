import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MusicContext } from "../context/MusicContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // ✅ ADD THIS

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { playMusic } = useContext(MusicContext);
  const [musics, setMusics] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // ✅ FIXED API CALLS
        const musicRes = await axios.get(`${API}/api/music`);
        const albumRes = await axios.get(`${API}/api/music/album`);

        setMusics(musicRes.data.musics || []);
        setAlbums(albumRes.data.albums || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [user, navigate]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Good evening{user ? `, ${user.username}` : ''}</h2>

        <button
          className="btn btn-secondary"
          style={{ width: 'auto', padding: '8px 16px' }}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Your Albums</h3>

        <div className="grid-container">
          {albums.map((album) => (
            <Link to={`/album/${album._id}`} key={album._id} className="card">
              <div className="card-img-container">
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #333, #111)'
                }}></div>
              </div>

              <div className="card-title">{album.title}</div>
              <div className="card-subtitle">Album</div>
            </Link>
          ))}

          {albums.length === 0 && (
            <p style={{ color: 'var(--text-subdued)' }}>
              No albums found.
            </p>
          )}
        </div>
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3>Recently Added Music</h3>

          <Link
            to="/upload"
            className="btn btn-secondary"
            style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
          >
            Upload Music
          </Link>
        </div>

        <div className="grid-container">
          {musics.map((music) => (
            <div
              key={music._id}
              className="card"
              onClick={() => playMusic(music, musics)}
            >
              <div className="card-img-container">
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1db954, #121212)'
                }}></div>
              </div>

              <div className="card-title">{music.title}</div>
              <div className="card-subtitle">
                {music.artist?.username || 'Unknown Artist'}
              </div>
            </div>
          ))}

          {musics.length === 0 && (
            <p style={{ color: 'var(--text-subdued)' }}>
              No music found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;