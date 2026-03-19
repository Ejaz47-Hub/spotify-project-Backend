import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Album from "./pages/Album";
import Upload from "./pages/Upload";
import CreateAlbum from "./pages/CreateAlbum";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { MusicProvider } from "./context/MusicContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <MusicProvider>
      <Router>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#1db954',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#ff5252',
              },
            },
          }}
        />
        <div className="layout">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/create-album" element={<CreateAlbum />} />
            </Routes>
          </div>
        </div>
        {user && <Player />}
      </Router>
    </MusicProvider>
  );
}

export default App;