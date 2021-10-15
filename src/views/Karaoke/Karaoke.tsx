import { Center, Container, Flex } from '@chakra-ui/layout';
import { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useStyles } from '@chakra-ui/system';
import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getLyrics, getSongId } from '../../redux/song';
import LyricsScroll from '../../components/LyricsScroll/LyricsScroll';
import AudioPlayer from '../../components/AudioPlayer/Player';
import { Cookies } from 'react-cookie';
import auth from '../../lib/auth';

interface KaraokeProps {}

const Karaoke: FC<KaraokeProps> = () => {
    const history = useHistory();

    const mochi = new Cookies().get('mochi');
    if (!mochi) {
        history.push('/login');
    } else if (auth.isTokenExpired(mochi.accessToken)) {
        new Cookies().remove('mochi');
        history.push('/login');
    }

    const [playing, setPlaying] = useState(false);

    const reduxId = useSelector(getSongId);
    const reduxLyrics = useSelector(getLyrics);

    const [audio, setAudio] = useState<HTMLAudioElement>(
        new Audio(`https://karaoketec.s3.us-east-2.amazonaws.com/${reduxId}`)
    );

    const [iconPlaying, setIconPlaying] = useState(false);

    async function playAudio() {
        await audio.play().catch((error) => {
            console.log('Error playing song: ', error);
        });
    }

    const togglePlay = () => {
        setIconPlaying(!iconPlaying);
        setPlaying(!playing);
        console.log(audio.paused && !iconPlaying);
        if (audio.paused && !iconPlaying) {
            playAudio();
            return;
        }
        audio.pause();
    };

    return (
        <>
            <Container>
                <LyricsScroll
                    lyrics={reduxLyrics}
                    onChange={togglePlay}
                    playing={playing}
                ></LyricsScroll>
                <Flex justify="center" borderRadius="2xl" bg="gray.200">
                    {!iconPlaying ? (
                        <IconButton
                            aria-label="playButton"
                            variant="ghost"
                            mr="15px"
                            onClick={togglePlay}
                        >
                            <Icon as={MdPlayArrow}></Icon>
                        </IconButton>
                    ) : undefined}
                    {iconPlaying ? (
                        <IconButton
                            aria-label="playButton"
                            variant="ghost"
                            mr="15px"
                            onClick={togglePlay}
                        >
                            <Icon as={MdPause}></Icon>
                        </IconButton>
                    ) : undefined}
                    <AudioPlayer playing={false} />
                </Flex>
            </Container>
        </>
    );
};

export default Karaoke;
