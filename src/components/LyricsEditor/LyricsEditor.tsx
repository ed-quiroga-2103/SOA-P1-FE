import {
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLyrics, setLyrics } from '../../redux/song';
import createLRCData from '../../utils/createLRCData';
import handleLRCData from '../../utils/handleLRCData';
import ErrorWithToolTip from '../ErrorWithToolTip/ErrorWithToolTip';

interface LyricsEditorProps {
    data?: string;
    editing?: boolean;
}

const LyricsEditor: FC<LyricsEditorProps> = ({ data, editing = false }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    let reduxData = data;

    const reduxLyrics = useSelector(getLyrics);

    if (!data) {
        reduxData = reduxLyrics;
    }

    let handledData = { times: [], lyrics: [], timeStamps: [] };
    let times = '[00:00:00]';
    let lyrics = '';
    useEffect(()=> {
        if (reduxLyrics !== '') {
        console.log(reduxLyrics);
        handledData = handleLRCData(reduxLyrics);
        times = handledData.timeStamps.join('\n');
        lyrics = handledData.lyrics.join('\n');
        setTimesData(times);
        setLyricsData(lyrics);
    }
    },[])
    
    console.log(lyrics, times);
    const [timesData, setTimesData] = useState(times);
    const [lyricsData, setLyricsData] = useState(lyrics);
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (event) => {
        const lines = lyricsData.split(/\r\n|\r|\n/).length;

        let tempValue = timesData;

        tempValue.split(/\r\n|\r|\n/).length < lines
            ? (tempValue += '\n[00:00:00]')
            : (tempValue = tempValue);
        setTimesData(tempValue);

        let inputValue = event.target.value;
        setLyricsData(inputValue);
    };

    const handleTimesInput = (event) => {
        let tempValue: string = event.target.value;

        if (
            tempValue.charAt(tempValue.length - 1) === '\n' &&
            tempValue.length > timesData.length
        ) {
            tempValue =
                tempValue.slice(0, tempValue.length - 1) + '\n[00:00:00]';
        }
        setTimesData(tempValue);
    };

    const handleScroll = (event) => {
        const times = document.getElementById('times');
        const lyrics = document.getElementById('lyrics');
        lyrics.scrollTop = times.scrollTop;
    };

    const saveLyrics = () => {
        const regexExp = new RegExp(/\[\d{1,}:\d{1,}:\d{1,}\]/);
        const times = timesData.split(/\r\n|\r|\n/);
        const lyrics = lyricsData.trim().split(/\r\n|\r|\n/);

        if (times.length !== lyrics.length) {
            setHasError(true);
            return;
        }

        for (const time of times) {
            const formattedTime = time.trim();
            if (!regexExp.test(formattedTime)) {
                setHasError(true);
                return;
            }
        }

        const data = createLRCData(times, lyrics);

        dispatch(setLyrics(data));

        if (editing) {
            history.push('/edit-song');
        } else {
            history.push('/create-song');
        }
    };

    return (
        <>
            <Container maxW="container.xl">
                <Text fontSize="2xl">Lyrics Editor</Text>
                <Grid
                    h="200px"
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(7, 1fr)"
                    gap={1}
                >
                    <GridItem colSpan={1}>
                        <Textarea
                            id="times"
                            value={timesData}
                            onChange={handleTimesInput}
                            placeholder="[HH:MM:SS]"
                            size="sm"
                            onScroll={handleScroll}
                            height="500px"
                            resize="none"
                        />
                    </GridItem>

                    <GridItem colSpan={6}>
                        <Textarea
                            id="lyrics"
                            value={lyricsData}
                            onChange={handleInputChange}
                            placeholder="Here is a sample placeholder"
                            size="sm"
                            onScroll={handleScroll}
                            height="500px"
                            resize="none"
                        />
                    </GridItem>
                    <GridItem colSpan={7}>
                        {hasError ? (
                            <ErrorWithToolTip
                                error="Something is wrong with your data!"
                                tip="Check that both sides have the same number of lines, and the timestamps format."
                            />
                        ) : undefined}
                    </GridItem>
                    <GridItem colSpan={7}>
                        <Flex justify="right">
                            <Button
                                onClick={() => {
                                    setHasError(false);
                                    saveLyrics();
                                }}
                            >
                                Save Lyrics!
                            </Button>
                        </Flex>
                    </GridItem>
                </Grid>
            </Container>
        </>
    );
};

export default LyricsEditor;
