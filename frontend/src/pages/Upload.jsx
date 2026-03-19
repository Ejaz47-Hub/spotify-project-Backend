import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

const Upload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("music", file);

    try {
      await axios.post(`${API}/api/music/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Music uploaded successfully!");
      setTitle("");
      setFile(null);
      // Reset file input manually if needed
      e.target.reset();
    } catch (error) {
      console.log(error);
      
      // Error is handled by global interceptor in main.jsx
      // But we can add specific handling if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5vh' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Upload Music</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Song Title</label>
          <input
            type="text"
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Audio File</label>
          <input 
            type="file" 
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])} 
            required 
            style={{ padding: '10px' }} 
          />
        </div>
        <button 
          type="submit" 
          className="btn" 
          style={{ marginTop: '16px', opacity: loading ? 0.7 : 1 }}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
