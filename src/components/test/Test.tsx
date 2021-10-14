import { Center, Container, Flex } from '@chakra-ui/layout';
import { FC, useRef } from 'react';
import AudioPlayer from '../AudioPlayer/Player';
import { useState } from 'react';

import LyricsScroll from '../LyricsScroll/LyricsScroll';
import { useStyles } from '@chakra-ui/system';
import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { MdPlayArrow, MdPause } from 'react-icons/md';



interface TestProps {}

const Test: FC<TestProps> = () => {
    
    const [playing, setPlaying] = useState(false);
    var audio = new Audio('https://karaoketec.s3.us-east-2.amazonaws.com/7');
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          audio.pause();
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
    
    
    async function playAudio() {
        try {
          await audio.play();
          
        } catch(err) {
          
        }
      }

    const togglePlay =()=>{
        if (audio.paused) {
            
            playAudio();
            console.log(playing);
          } else {
            audio.pause();
            
          }
       
    }

    return (
        <>
            <Container>
                <LyricsScroll
                    lyrics={
                        '[00:00:00]Line 1\n[00:00:02]Line 2\n[00:00:03]Line 3\n[00:00:04]Line 4\n[00:00:10]Line 5\n'
                    }
                    onChange={togglePlay}
                    playing={playing}
                    
                ></LyricsScroll>
                <Flex justify='center' borderRadius='2xl' bg ='gray.200'>                    
                        <IconButton aria-label='playButton' variant='ghost' mr='15px' onClick={togglePlay}>
                            {!playing ? (
                            <Icon as={MdPlayArrow}></Icon>
                            ) : (
                            <Icon as={MdPause}></Icon>
                                )}
                        </IconButton>
                        <AudioPlayer playing={playing}/>
                </Flex>
            </Container>
        </>
    );
};

export default Test;
