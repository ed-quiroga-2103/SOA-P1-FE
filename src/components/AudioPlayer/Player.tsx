import React, { FunctionComponent, useRef } from 'react';
import { MdVolumeMute, MdVolumeUp } from 'react-icons/md';
import Icon from '@chakra-ui/icon';
import { Select, Flex, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface AudioPlayerProps {
    playing?: boolean;
    tooglePlay?: any;
}

const AudioPlayer: FunctionComponent<AudioPlayerProps> = ({ playing }) => {
    const videoElement = useRef(null);

    /* const {                                     // Setting up the hook
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
    }   = Audiohook(videoElement); */
    ////////////////////////////////////////////////////

    //const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // State variables
    const [speed, setSpeed] = useState(1);
    const [muted, setMuted] = useState(false);

    /* const togglePlay = () => {
    setPlaying(!playing);                               // Toggle
  }; */

    useEffect(() => {
        // Hook to change between paused and playing
        playing ? videoElement.current.play() : videoElement.current.pause();
    }, [playing, videoElement]);

    const handleOnTimeUpdate = () => {
        // Helps tracking the progress
        const progress =
            (videoElement.current.currentTime / videoElement.current.duration) *
            100;
        setProgress(progress);
    };

    const handleVideoProgress = (event) => {
        // Handles the possibility to drag the progress bar
        const manualChange = Number(event.target.value);
        //videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;  //This is the reference to the video
        setProgress(manualChange);
    };

    const handleVideoSpeed = (event) => {
        // Handles the video speed
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setSpeed(speed);
    };
    const toggleMute = () => {
        // Toggles mute
        setMuted(!muted);
    };

    useEffect(() => {
        // Hook for toggling mute
        muted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false);
    }, [muted, videoElement]);

    ////////////////////////////////////////////////////

    return (
        <>
            <div className="video-wrapper">
                <audio
                    /* src={video} */
                    ref={videoElement}
                    onTimeUpdate={handleOnTimeUpdate}
                />
                <div className="controls">
                    <Flex justifyContent="center">
                        <div className="actions">
                            {/* <IconButton aria-label='playButton' variant='ghost' onClick={togglePlay}>
                            {!playing ? (
                                <Icon as={MdPlayArrow}></Icon>
                            ) : (
                                <Icon as={MdPause}></Icon>
                            )}
                            </IconButton> */}
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => handleVideoProgress(e)}
                        />
                        <Select
                            className="velocity"
                            variant="ghost"
                            value={speed}
                            onChange={(e) => handleVideoSpeed(e)}
                            width="70px"
                            height="30px"
                            mt="5px"
                            bg="gray.200"
                        >
                            <option value="0.50">0.50x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="2">2x</option>
                        </Select>
                        <button className="mute-btn" onClick={toggleMute}>
                            {!muted ? (
                                <Icon as={MdVolumeUp}></Icon>
                            ) : (
                                <Icon as={MdVolumeMute}></Icon>
                            )}
                        </button>
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default AudioPlayer;
