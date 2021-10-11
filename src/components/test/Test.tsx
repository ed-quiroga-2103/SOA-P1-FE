import { Container } from '@chakra-ui/layout';
import { FC } from 'react';
import AudioPlayer from '../AudioPlayer/Player';
import About from '../Information/About';
import Contact from '../Information/Contact';
import LyricsScroll from '../LyricsScroll/LyricsScroll';

interface TestProps {}

const Test: FC<TestProps> = () => {
    return (
        <>
            <Container>
                <LyricsScroll
                    lyrics={
                        '[00:00:00]Line 1\n[00:00:02]Line 2\n[00:00:03]Line 3\n[00:00:04]Line 4\n[00:00:10]Line 5\n'
                    }
                ></LyricsScroll>
                <AudioPlayer />
            </Container>
        </>
    );
};

export default Test;
