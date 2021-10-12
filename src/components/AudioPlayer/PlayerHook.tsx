import { useState, useEffect } from "react";

const useVideoPlayer = (videoElement) => {

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);        // State variables 
    const [speed, setSpeed] = useState(1);
    const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    setPlaying(!playing);                               // Toggle
  };

  useEffect(() => {                                     // Hook to change between paused and playing
    playing
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playing, videoElement]);

  const handleOnTimeUpdate = () => {                    // Helps tracking the progress
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setProgress(progress);
  };

  const handleVideoProgress = (event) => {              // Handles the possibility to drag the progress bar 
    const manualChange = Number(event.target.value);
    //videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;  //This is the reference to the video
    setProgress(manualChange);
  };

  const handleVideoSpeed = (event) => {                 // Handles the video speed
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setSpeed(speed)
  };
  const toggleMute = () => {                            // Toggles mute
    setMuted(!muted)
  };

  useEffect(() => {                                     // Hook for toggling mute
    muted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [muted, videoElement]);

  return {
    playing,
    progress,
    speed,
    muted,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    setPlaying
  };
};

export default useVideoPlayer;