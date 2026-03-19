import { createContext, useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentMusic, setCurrentMusic] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const { user } = useContext(AuthContext);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!user) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      setCurrentMusic(null);
      setPlaylist([]);
      setCurrentIndex(-1);
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
      setCurrentTime(0);
    }
  }, [user]);

  const playMusic = (music, list = []) => {
    if (list.length > 0) {
      setPlaylist(list);
      const index = list.findIndex(m => m._id === music._id);
      setCurrentIndex(index);
    }

    if (currentMusic?._id === music._id) {
      togglePlay();
      return;
    }
    
    setCurrentMusic(music);
    audioRef.current.src = music.uri;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (currentMusic) audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    if (playlist.length === 0) return;
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    playMusic(playlist[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const skipPrevious = () => {
    if (playlist.length === 0) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playMusic(playlist[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const seek = (percentage) => {
    if (!audioRef.current.duration) return;
    const time = (percentage / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    setProgress(percentage);
  };

  const setVolume = (value) => {
    audioRef.current.volume = value;
    setVolumeState(value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateProgress = () => {
      if (audio.duration && !isSeeking) {
        const curTime = audio.currentTime;
        const dur = audio.duration;
        setCurrentTime(curTime);
        setProgress((curTime / dur) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        skipNext();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playlist, currentIndex, isShuffle, isRepeat]);

  return (
    <MusicContext.Provider value={{ 
      currentMusic, 
      isPlaying, 
      playMusic, 
      togglePlay, 
      progress, 
      duration,
      currentTime,
      volume,
      setVolume,
      seek,
      skipNext,
      skipPrevious,
      isShuffle,
      setIsShuffle,
      isRepeat,
      setIsRepeat,
      isSeeking,
      setIsSeeking,
      audioRef 
    }}>
      {children}
    </MusicContext.Provider>
  );
};
