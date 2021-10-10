import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Input,
    List,
    ListIcon,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Select,
    Skeleton,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FunctionComponent, useState, useEffect } from 'react';
import {
    MdAdd,
    MdArrowLeft,
    MdArrowRight,
    MdDelete,
    MdEdit,
    MdPlayArrow,
    MdSearch,
    MdRefresh,
} from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import api from '../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbum, setArtist, setLyrics, setName } from '../../redux/song';

interface SongListProps {
    songs?: string[];
}

const SongList: FunctionComponent<SongListProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [request, setRequest] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('Song');
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [size, setSize] = useState(0);
    const [songs, setSongs] = useState([]);
    const [pages, setPages] = useState(0);
    const [comp, setComp] = useState([]);

    const handleSearchCriteria = (event) => setSearchCriteria(event.target.value);
    const handleSearchValue = (event) => setSearchValue(event.target.value);

    
    useEffect(() => {
        async function getData() {
            await api
                .getSongs()
                .then((response) => {
                    const test = response as any;       // Fake typing
                    console.log('Test', test);
                    setSongs(test.data);
                    setIsLoading(false);
                    console.log("printing data",test.data)
                })
                .catch((error) => console.log(error));
        }

        getData();
    }, [pages]);

    const pageSize = 10;

    function handleEnter(e) {
        var key = e.keyCode || e.which;
        if (key == 13) {
            console.log('capturing enter');
            searchBy();
        }
    }

    function searchBy() {
        console.log(searchCriteria);
        console.log(searchValue);
        api.getSong(searchCriteria, searchValue);
    }

    function handlePage(event) {
        let a = 10 * (event.target.id - 1);
        let b = 10 * event.target.id;
        setSongs(request.data.slice(a, b));
    }
    
    function play(algo) {
        console.log('Song is playing: ' + algo.name);
    }

    function deleteSong(id) {
        console.log('Deleting song: ' + id);
        api.deleteSong(id);
    }

    function editSong(song) {
        dispatch(setName(song.name));
        dispatch(setAlbum(song.album));
        dispatch(setArtist(song.artist));
        dispatch(setLyrics(song.lyrics));
        console.log('Editting song: ' + song.name);
        history.push('/edit-song');
    }

    function addSong() {
        dispatch(setName(''));
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
                                <Skeleton startColor="black.500" endColor="pink.500" height="20px" />
                                <Skeleton startColor="black.500" endColor="pink.500" height="20px" />
                                <Skeleton startColor="black.500" endColor="pink.500" height="20px" />
                            </Stack>
                        )}
                        {songs.map(
                            (
                                song // I need each element to be a song object so i can load it in redux befor an edit
                            ) => {return (
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
                                            <Text mt="2px">{song.name}</Text>
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
                                                onClick={() => editSong(song)}
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
                                                            You are about to
                                                            delete a song
                                                        </PopoverHeader>
                                                        <PopoverCloseButton />
                                                        <PopoverBody>
                                                            <Button
                                                                colorScheme="blue"
                                                                onClick={
                                                                    () =>
                                                                        deleteSong(
                                                                            song._id
                                                                        ) //This should take the id of the song thats about to be deleted.
                                                                }
                                                            >
                                                                Confirm
                                                            </Button>
                                                        </PopoverBody>
                                                        <PopoverFooter justifyContent="center">
                                                            Are you sure?
                                                        </PopoverFooter>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        </GridItem>
                                    </Grid>
                                </ListItem>
                            )}
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
