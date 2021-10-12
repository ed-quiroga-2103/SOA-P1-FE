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

    const togglePlay =()=>{
        setPlaying(!playing);
        console.log(playing);
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
