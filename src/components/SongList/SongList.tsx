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
import { current } from 'immer';
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
    const [currentPage,setCurrentPage] = useState(1);

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
            searchBy();
        }
    }
    function paginate(songs){
        let localComp = [];
        let numOfPages = Math.ceil(songs.length/10);
        for (let i = 0; i <numOfPages; i++){
            var j = String(i+1);
            localComp.push(<Button
                        id= {j}
                        key={i} 
                        size="sm" 
                        mt="4px" 
                        mr="3px" 
                        variant='ghost' 
                        color="#35212A"
                        //onClick ={handlePage}
                        readOnly
                        > {currentPage} 
                      </Button>)
        }
        setCurrentPage(1);
        setComp(localComp);
        setPages(numOfPages);

    }

    async function searchBy() {
        const songs = (await api.getSong(searchCriteria, searchValue)) as any;
        setSongs(songs.data);
    }

    function handlePage(event) {
        let a = 10 * (event.target.id - 1);
        let b = 10 * event.target.id;
        setSongs(songs.slice(a, b));
        setCurrentPage(event.target.id);
        
    }
    async function handleArrow(event){
        
        if(event.target.id == 'leftArrow'){
            try{
                if(currentPage!=1){setIsLoading(true); setSongs([]);}
                await api
                .getPage(currentPage-1)
                .then((response) => {
                    const test = response as any; // Fake typing
                    if(test.status !=204){
                        setSongs(test.data);
                        setCurrentPage(currentPage-1);
                    }
                    setIsLoading(false);
                })
                .catch((error) => console.log(error));
            }catch(error){
                console.log(error)
            }
        }else if (event.target.id == 'rightArrow'){
            try{
                let local = songs;
                setSongs([]);
                setIsLoading(true);
                await api
                .getPage(currentPage+1)
                .then((response) => {
                    const test = response as any; // Fake typing

                    if (test.data.length >0){
                        setSongs(test.data);
                        setCurrentPage(currentPage+1);
                        setIsLoading(false);
                    }else{
                        
                        setSongs(local);
                        setIsLoading(false)
                    }
                })
                .catch((error) => console.log(error));
                
            }catch(error){
                console.log(error)
            }
            
        }
    }

    function play(algo) {
        
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
        history.push('/edit-song');
    }

    function addSong() {
        dispatch(setSongName(''));
        dispatch(setAlbum(''));
        dispatch(setArtist(''));
        dispatch(setLyrics(''));
        history.push('/create-song');
    }

    return (
        <>
            <Container maxW="100%" /* bg='black' */ borderRadius='2xl'>
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
                                color='white'
                                bg='#7B61F8'
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
                                bg='#7B61F8'
                                color='white'
                            />
                        </Flex>
                    </Box>
                </Flex>
                <hr />
                <Box padding="4" bg="#ffacfc" maxW="wxl" borderRadius="xl">
                    <Flex justify='right' mb="7px">
                        <Button
                            size="sm"
                            bg="black"
                            color='white'
                            rightIcon={<MdAdd />}
                            onClick={() => addSong()}
                            
                        >
                            Add
                        </Button>
                    </Flex>
                    <List>
                        {<ListItem
                                        mt="3px"
                                        bg='black'
                                        borderRadius="md"
                                        height="43px"
                                        color="white"
                                        key='initial'
                                    >
                                        <Grid
                                            templateColumns="repeat(20,1fr)"
                                            gap={6}
                                        >
                                            <GridItem
                                                colStart={2}
                                                colEnd={7}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    Song
                                                </Text>
                                            </GridItem>

                                            <GridItem
                                                colStart={7}
                                                colEnd={14}
                                                mt="5px"
                                                ml="9%"
                                            >
                                                <Text mt="2px">
                                                    Artist
                                                </Text>
                                            </GridItem>

                                            <GridItem
                                                colStart={14}
                                                colEnd={18}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    Album
                                                </Text>
                                            </GridItem>
                                            
                                            <GridItem
                                                colStart={19}
                                                colEnd={20}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    Customize
                                                </Text>
                                            </GridItem>

                                        </Grid>
                        </ListItem>}
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
                                        key={song.id}
                                    >
                                        <Grid
                                            templateColumns="repeat(20,1fr)"
                                            gap={6}
                                        >
                                            <GridItem
                                                colStart={2}
                                                colEnd={8}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    {song.name}
                                                </Text>
                                            </GridItem>

                                            <GridItem
                                                colStart={8}
                                                colEnd={14}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    {song.artist}
                                                </Text>
                                            </GridItem>

                                            <GridItem
                                                colStart={15}
                                                colEnd={18}
                                                mt="5px"
                                            >
                                                <Text mt="2px">
                                                    {song.album}
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
                            id='leftArrow'
                            aria-label="ArrowLeft"
                            variant="ghost"
                            as={MdArrowLeft}
                            boxSize={8}
                            color="#000000"
                            mt="2px"
                            onClick={handleArrow}
                        />
                        <Text 
                            mt='6px' 
                            ml='3px' 
                            mr='3px'
                            color='black'
                            >
                                {currentPage}
                            </Text>
                        <IconButton
                            id='rightArrow'
                            aria-label="ArrowRight"
                            variant="ghost"
                            as={MdArrowRight}
                            boxSize={8}
                            color="#000000"
                            mt="2px"
                            onClick={handleArrow}
                        />
                    </Flex>
                </Box>
            </Container>
        </>
    );
};
export default SongList;
