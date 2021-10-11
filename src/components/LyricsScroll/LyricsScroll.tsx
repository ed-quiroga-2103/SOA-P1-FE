import { FC, useEffect, useState } from 'react';
import { Button, Center, Container, Stack, Text } from '@chakra-ui/react';
import handleLRCData from '../../utils/handleLRCData';

interface LyricsScrollProps {
    lyrics: string;
}

const LyricsScroll: FC<LyricsScrollProps> = ({ lyrics }) => {
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [index, setIndex] = useState(1);

    const handledData = handleLRCData(lyrics);
    useEffect(() => {
        setTimeout(() => {
            if (playing) {
                setCurrentSeconds(currentSeconds + 1);

                if (index >= handledData.times.length) {
                    setIndex(index + 1);
                } else if (currentSeconds + 1 === handledData.times[index]) {
                    setIndex(index + 1);
                }
            }
        }, 1000);
    });
    return (
        <Container>
            <Center bg="gray.400">
                <Stack justify="center">
                    <Text justify="center">
                        {handledData.lyrics[index - 2]
                            ? handledData.lyrics[index - 2]
                            : ''}
                    </Text>
                    <Text color="red" justify="center">
                        {handledData.lyrics[index - 1]
                            ? handledData.lyrics[index - 1]
                            : ''}
                    </Text>
                    <Text justify="center">
                        {handledData.lyrics[index]
                            ? handledData.lyrics[index]
                            : ''}
                    </Text>
                    <Text>Seconds: {currentSeconds}</Text>
                    <Button
                        onClick={() => {
                            setPlaying(!playing);
                        }}
                    >
                        play
                    </Button>
                </Stack>
            </Center>
        </Container>
    );
};

export default LyricsScroll;
