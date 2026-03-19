import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react";

const Player = () => {
  const { 
    currentMusic, 
    isPlaying, 
    togglePlay, 
    progress, 
    seek, 
    volume, 
    setVolume, 
    skipNext, 
    skipPrevious,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    duration,
    currentTime,
    isSeeking, // Added this line
    setIsSeeking,
    audioRef // Added this line
  } = useContext(MusicContext);

  if (!currentMusic) return null;

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === undefined) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  // Dynamic slider background calculation
  const getSliderBackground = (val, max = 100) => {
    const percentage = (val / max) * 100;
    return `linear-gradient(to right, #ffffff ${percentage}%, #4d4d4d ${percentage}%)`;
  };

  return (
    <div className="player-container">
      <div className="player-info">
        <div className="player-info-img">
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1db954, #121212)', borderRadius: '4px' }}></div>
        </div>
        <div className="player-info-text">
          <div className="player-info-title">{currentMusic.title}</div>
          <div className="player-info-artist">{currentMusic.artist?.username || "Unknown Artist"}</div>
        </div>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <Shuffle 
            size={16} 
            color={isShuffle ? "#1db954" : "#b3b3b3"} 
            className="cursor-pointer" 
            onClick={() => setIsShuffle(!isShuffle)} 
          />
          <SkipBack 
            size={20} 
            fill="#b3b3b3" 
            color="#b3b3b3" 
            className="cursor-pointer" 
            onClick={skipPrevious} 
          />
          <div className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} fill="#000" /> : <Play size={20} fill="#000" style={{ marginLeft: '2px' }} />}
          </div>
          <SkipForward 
            size={20} 
            fill="#b3b3b3" 
            color="#b3b3b3" 
            className="cursor-pointer" 
            onClick={skipNext} 
          />
          <Repeat 
            size={16} 
            color={isRepeat ? "#1db954" : "#b3b3b3"} 
            className="cursor-pointer" 
            onClick={() => setIsRepeat(!isRepeat)} 
          />
        </div>
        <div className="playback-bar">
          <span style={{ minWidth: '35px', textAlign: 'right' }}>{formatTime(currentTime)}</span>
          <input 
            type="range" 
            className="progress-slider"
            min="0" 
            max="100" 
            step="0.1"
            value={progress} 
            onInput={handleSeek}
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={() => setIsSeeking(false)}
            style={{ background: getSliderBackground(progress) }}
          />
          <span style={{ minWidth: '35px' }}>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <Volume2 size={20} />
        <input 
          type="range" 
          className="volume-slider"
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onInput={handleVolumeChange}
          style={{ background: getSliderBackground(volume, 1) }}
        />
      </div>
    </div>
  );
};

export default Player;
