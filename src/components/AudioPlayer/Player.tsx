import React, { FunctionComponent, useRef } from "react";
import Audiohook from './PlayerHook';
import {MdPlayArrow, MdPause, MdVolumeMute, MdVolumeUp} from 'react-icons/md';
import Icon from "@chakra-ui/icon";
import { Select, Flex, IconButton } from "@chakra-ui/react";
interface AudioPlayerProps{
    isplaying?: boolean;
}

const AudioPlayer : FunctionComponent<AudioPlayerProps> = ({isplaying}) => {

    const videoElement = useRef(null);

    const {                                     // Setting up the hook
        playing,
        progress,
        speed,
        muted,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute
    }   = Audiohook(videoElement);
    
    return(
        <>
            
                <div className="video-wrapper">
                    <audio
                    /* src={video} */
                    ref={videoElement}
                    onTimeUpdate={handleOnTimeUpdate}
                    />
                    <div className="controls">
                    <Flex justifyContent='center'>
                        <div className="actions">
                            <IconButton aria-label='playButton' variant='ghost' onClick={togglePlay}>
                            {!playing ? (
                                <Icon as={MdPlayArrow}></Icon>
                            ) : (
                                <Icon as={MdPause}></Icon>
                            )}
                            </IconButton>
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
                            variant='ghost'
                            value={speed}
                            onChange={(e) => handleVideoSpeed(e)}
                            width='70px'
                            height='30px'
                            mt='5px'
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
    )
};

export default AudioPlayer;