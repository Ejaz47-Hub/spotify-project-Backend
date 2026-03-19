import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateAlbum = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedMusics, setSelectedMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'artist') {
      navigate("/dashboard");
      return;
    }
    const fetchMusics = async () => {
      try {
        const res = await axios.get("/api/music");
        // Filter only artist's music if needed, but per requirements "listen to all artists musics"
        // Here we just fetch all to let the artist pick their songs (usually they'd pick their own)
        setMusics(res.data.musics.filter(m => m.artist?._id === user.id) || []);
      } catch (error) {
        console.error("Failed to fetch musics", error);
      }
    };
    fetchMusics();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMusics.length === 0) {
      toast.error("Please select at least one song");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/music/album", {
        title,
        musics: selectedMusics
      });
      toast.success("Album created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  const toggleMusicSelection = (id) => {
    if (selectedMusics.includes(id)) {
      setSelectedMusics(selectedMusics.filter(mId => mId !== id));
    } else {
      setSelectedMusics([...selectedMusics, id]);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1>Create New Album</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Album Title</label>
          <input 
            type="text" 
            placeholder="Enter album title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Select Songs</label>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px', background: 'var(--bg-elevated)', border: '1px solid var(--divider)', borderRadius: '4px' }}>
            {musics.map(music => (
              <div 
                key={music._id} 
                onClick={() => toggleMusicSelection(music._id)}
                style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid var(--divider)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  background: selectedMusics.includes(music._id) ? 'var(--bg-hover)' : 'transparent'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={selectedMusics.includes(music._id)} 
                  readOnly 
                  style={{ width: '20px', marginRight: '10px' }}
                />
                <span>{music.title}</span>
              </div>
            ))}
            {musics.length === 0 && <p style={{ padding: '12px', color: 'var(--text-subdued)' }}>No songs found. Upload some music first!</p>}
          </div>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Creating..." : "Create Album"}
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;
