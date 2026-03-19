import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MusicContext } from "../context/MusicContext";
const API = import.meta.env.VITE_API_URL;

const Album = () => {
  const [album, setAlbum] = useState(null);
  const { id } = useParams();
  const { playMusic } = useContext(MusicContext);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get(`${API}/api/music/albums/${id}`);
        setAlbum(res.data.album);
      } catch (error) {
        console.error("Failed to fetch album", error);
      }
    };
    fetchAlbum();
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' }}>
        <div style={{ width: '232px', height: '232px', background: 'linear-gradient(135deg, #333, #111)', boxShadow: '0 4px 60px rgba(0,0,0,0.5)' }}></div>
        <div>
          <span style={{ fontSize: '14px', fontWeight: '700' }}>Album</span>
          <h1 style={{ fontSize: '96px', margin: '0 0 16px 0', letterSpacing: '-0.04em' }}>{album.title}</h1>
          <p style={{ color: 'var(--text-subdued)' }}>{album.musics.length} songs</p>
        </div>
      </div>
      
      <div style={{ marginTop: '32px' }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', color: 'var(--text-subdued)' }}>
          <div style={{ width: '40px', textAlign: 'center' }}>#</div>
          <div style={{ flex: 1 }}>Title</div>
        </div>
        <ul>
          {album.musics.map((music, index) => (
            <li 
              key={music._id} 
              style={{ display: 'flex', padding: '8px 0', alignItems: 'center', borderRadius: '4px', cursor: 'pointer' }} 
              className="nav-link"
              onClick={() => playMusic(music, album.musics)}
            >
              <div style={{ width: '40px', textAlign: 'center', color: 'var(--text-subdued)' }}>{index + 1}</div>
              <div style={{ flex: 1, fontWeight: '500', color: 'var(--text-highlight)' }}>{music.title}</div>
            </li>
          ))}
          {album.musics.length === 0 && <li style={{ color: 'var(--text-subdued)', padding: '16px' }}>No songs in this album.</li>}
        </ul>
      </div>
    </div>
  );
};

export default Album;
