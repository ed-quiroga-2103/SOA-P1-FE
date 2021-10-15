import { FC, useEffect, useState } from 'react';
import { Box, Center, Container, Stack, Text } from '@chakra-ui/react';
import handleLRCData from '../../utils/handleLRCData';

interface LyricsScrollProps {
    lyrics: string;
    playing?: boolean;
    onChange: any;
}

const LyricsScroll: FC<LyricsScrollProps> = ({ lyrics, playing }) => {
    const [currentSeconds, setCurrentSeconds] = useState(0);
    //const [playing, setPlaying] = useState(false);
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
            <Center bg="gray.400" height="176px">
                <Stack justify="center">
                    <Box boxSize="3.5" />
                    <Text
                        justify="center"
                        fontWeight="extrabold"
                        fontFamily="sans-serif"
                    >
                        {handledData.lyrics[index - 2]
                            ? handledData.lyrics[index - 2]
                            : ''}
                    </Text>
                    <Text
                        color="red"
                        justify="center"
                        fontSize="2xl"
                        fontWeight="extrabold"
                        fontFamily="sans-serif"
                    >
                        {handledData.lyrics[index - 1]
                            ? handledData.lyrics[index - 1]
                            : ''}
                    </Text>
                    <Text
                        justify="center"
                        fontWeight="extrabold"
                        fontFamily="sans-serif"
                    >
                        {handledData.lyrics[index]
                            ? handledData.lyrics[index]
                            : ''}
                    </Text>
                    <Box boxSize="3.5" />
                </Stack>
            </Center>
        </Container>
    );
};

export default LyricsScroll;
