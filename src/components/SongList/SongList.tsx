import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Input,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Select,
    Skeleton,
    Spacer,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { FunctionComponent, useEffect, useState } from 'react';
import {
    MdAdd,
    MdArrowLeft,
    MdArrowRight,
    MdDelete,
    MdEdit,
    MdPlayArrow,
    MdSearch,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api from '../../lib/api';
import { setAlbum, setArtist, setLyrics, setSongName, setSongId } from '../../redux/song';
import { getPremium } from '../../redux/user';

interface SongListProps {
    songs?: string[];
}

const SongList: FunctionComponent<SongListProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isPremium = useSelector(getPremium);
    const toast = useToast();

    const [request, setRequest] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('Song');
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [size, setSize] = useState(0);
    const [songs, setSongs] = useState([]);
    const [pages, setPages] = useState(0);
    const [comp, setComp] = useState([]);

    const handleSearchCriteria = (event) =>
        setSearchCriteria(event.target.value);
    const handleSearchValue = (event) => setSearchValue(event.target.value);

    useEffect(() => {
        async function getData() {
            await api
                .getSongs()
                .then((response) => {
                    const test = response as any; // Fake typing
                    setSongs(test.data);
                    setIsLoading(false);
                })
                .catch((error) => console.log(error));
        }

        getData();
    }, [pages, request]);

    const pageSize = 10;

    function handleEnter(e) {
        var key = e.keyCode || e.which;
        if (key == 13) {
            console.log('capturing enter');
            searchBy();
        }
    }

    async function searchBy() {
        console.log(searchCriteria);
        console.log(searchValue);
        const songs = (await api.getSong(searchCriteria, searchValue)) as any;
        setSongs(songs.data);
    }

    function handlePage(event) {
        let a = 10 * (event.target.id - 1);
        let b = 10 * event.target.id;
        setSongs(request.data.slice(a, b));
    }

    function play(algo) {
        console.log('Song is playing: ' + algo.name);
    }

    async function deleteSong(id) {
        if (!(isPremium === 'true')) {
            toast({
                title: `You're not allowed to do this!`,
                status: 'error',
                isClosable: true,
            });
            return;
        }
        console.log('Deleting song: ' + id);
        await api.deleteSong(id);
        await api
            .getSongs()
            .then((response) => {
                const test = response as any; // Fake typing
                setSongs(test.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }

    function editSong(song) {
        if (!(isPremium === 'true')) {
            toast({
                title: `You're not allowed to do this!`,
                status: 'error',
                isClosable: true,
            });
            return;
        }

        dispatch(setSongName(song.name));
        dispatch(setAlbum(song.album));
        dispatch(setArtist(song.artist));
        dispatch(setLyrics(song.lyrics));
        console.log('Editting song: ' + song.name);
        history.push('/edit-song');
    }

    function addSong() {
        dispatch(setSongName(''));
        dispatch(setAlbum(''));
        dispatch(setArtist(''));
        dispatch(setLyrics(''));
        history.push('/create-song');
        console.log('we are adding a new song');
    }

    return (
        <>
            <Container maxW="wxl">
                <Flex boxSize="wxl">
                    <Text fontSize="3xl" color="#FE53BB">
                        {' '}
                        SONGS{' '}
                    </Text>
                    <Spacer />
                    <Box w="15%" mb="3px">
                        <Input
                            id="searchInput"
                            mt="5px"
                            maxWidth="100%"
                            placeholder="Search"
                            mb="3px"
                            onKeyPress={handleEnter}
                            onChange={handleSearchValue}
                        />
                        <Flex>
                            <Select
                                defaultValue={searchCriteria}
                                mr="3px"
                                onChange={handleSearchCriteria}
                            >
                                <option value="Song"> Song </option>
                                <option value="Artist"> Artist </option>
                                <option value="Album"> Album </option>
                                <option value="Lyrics"> Lyrics </option>
                            </Select>
                            <IconButton
                                aria-label="searchButton"
                                icon={<MdSearch />}
                                onClick={searchBy}
                            />
                        </Flex>
                    </Box>
                </Flex>
                <hr />
                <Box padding="4" bg="#d9eb4b" maxW="wxl" borderRadius="xl">
                    <Flex justify="right" mb="7px">
                        <Button
                            size="sm"
                            rightIcon={<MdAdd />}
                            onClick={() => addSong()}
                        >
                            Add
                        </Button>
                    </Flex>
                    <List>
                        {isLoading && (
                            <Stack>
                                <Skeleton
                                    startColor="black.500"
                                    endColor="pink.500"
                                    height="20px"
                                />
                                <Skeleton
                                    startColor="black.500"
                                    endColor="pink.500"
                                    height="20px"
                                />
                                <Skeleton
                                    startColor="black.500"
                                    endColor="pink.500"
                                    height="20px"
                                />
                            </Stack>
                        )}
                        {songs.map(
                            (
                                song // I need each element to be a song object so i can load it in redux befor an edit
                            ) => {
                                return (
                                    <ListItem
                                        mt="3px"
                                        bg="#000000"
                                        borderRadius="md"
                                        height="43px"
                                        color="#FE53BB"
                                        key={song.name}
                                    >
                                        <Grid
                                            templateColumns="repeat(20,1fr)"
                                            gap={6}
                                        >
                                            <GridItem
                                                colStart={2}
                                                colEnd={15}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    {song.name}
                                                </Text>
                                            </GridItem>

                                            <GridItem
                                                colStart={18}
                                                mt="2px"
                                                ml="120px"
                                            >
                                                <IconButton
                                                    aria-label="playButton"
                                                    variant="ghost"
                                                    size="md"
                                                    icon={<MdPlayArrow />}
                                                    onClick={() => play(song)}
                                                />
                                            </GridItem>
                                            <GridItem
                                                colStart={19}
                                                mt="2px"
                                                ml="50px"
                                            >
                                                <IconButton
                                                    aria-label="editButton"
                                                    variant="ghost"
                                                    size="md"
                                                    icon={<MdEdit />}
                                                    onClick={() => {
                                                        dispatch(
                                                            setSongId(song._id)
                                                        );
                                                        editSong(song);
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem
                                                colStart={20}
                                                mt="2px"
                                                ml="30px"
                                            >
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <IconButton
                                                            aria-label="deleteButton"
                                                            size="md"
                                                            mr="3px"
                                                            variant="ghost"
                                                            color="FE53BB"
                                                            icon={<MdDelete />}
                                                        ></IconButton>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>
                                                                <Center>
                                                                    <Text fontSize="lg">
                                                                        You are
                                                                        about to
                                                                        delete a
                                                                        song!
                                                                    </Text>
                                                                </Center>
                                                            </PopoverHeader>
                                                            <PopoverCloseButton />
                                                            <PopoverBody>
                                                                <Stack>
                                                                    <Center
                                                                        m={2}
                                                                    >
                                                                        <Text>
                                                                            Are
                                                                            you
                                                                            sure?
                                                                        </Text>
                                                                    </Center>
                                                                    <Button
                                                                        colorScheme="red"
                                                                        w="100%"
                                                                        onClick={
                                                                            () =>
                                                                                deleteSong(
                                                                                    song._id
                                                                                ) //This should take the id of the song thats about to be deleted.
                                                                        }
                                                                    >
                                                                        Confirm
                                                                    </Button>
                                                                </Stack>
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>
                                            </GridItem>
                                        </Grid>
                                    </ListItem>
                                );
                            }
                        )}
                    </List>

                    <Flex justify="right" mt="10px">
                        <IconButton
                            aria-label="ArrowLeft"
                            variant="ghost"
                            as={MdArrowLeft}
                            boxSize={8}
                            color="#35212A"
                            mt="2px"
                        />
                        {comp}
                        <IconButton
                            aria-label="ArrowRight"
                            variant="ghost"
                            as={MdArrowRight}
                            boxSize={8}
                            color="#35212A"
                            mt="2px"
                        />
                    </Flex>
                </Box>
            </Container>
        </>
    );
};
export default SongList;
