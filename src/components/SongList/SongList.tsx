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
    Spacer,
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
} from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import api from '../../lib/api';

interface SongListProps {
    songs?: string[];
}


const SongList: FunctionComponent<SongListProps> = () => {
    const history = useHistory();

    const data = [
        'Bohemian Rhapsody',
        'Nunca es Suficiente',
        'If I aint got you',
        'Contramarea',
        'linger',
        'yello subamrine',
        'the night we met',
        'I ran',
        'Black',
        'pegame tu vicio',
        'Una Nota',
    ]; /* api.getSongs() */

    const [request, setRequest] = useState(null);
    
    useEffect(()=>{
        async function getData(){
            const request = await api.getSongs();
            setRequest(request);
        }
        getData();
    },[]
    )

    function handleEnter(e){
        var key=e.keyCode || e.which;
        if (key==13){
            console.log("capturing enter")
        }
    }
    
    function algo(){
        request.data.forEach(element => {
            console.log(element.name)
        });
    }
    
    const pageSize = 10;
    let size = data.length;
    console.log(size);
    var pages = Math.ceil(size / pageSize);
    const comp = [];
    const [songs, setSongs] = useState([]);

    for (let i = 0; i < pages; i++) {
        var j = String(i + 1);
        comp.push(
            <Button
                id={j}
                key={i}
                size="sm"
                mt="4px"
                mr="3px"
                variant="ghost"
                color="#35212A"
                onClick={handlePage}
            >
                {' '}
                {j}
            </Button>
        );
    }

    function handlePage(event) {
        let a = 10 * (event.target.id - 1);
        let b = 10 * event.target.id;
        setSongs(data.slice(a, b));
    }

    function play(algo) {
        console.log('Song is playing: ' + algo);
    }

    function deleteSong(algo) {
        console.log('Deleting song: ' + algo);
    }

    function editSong(algo) {
        console.log('Editting song: ' + algo);
    }

    function addSong() {
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
                            mt="5px"
                            maxWidth="100%"
                            placeholder="Search"
                            mb="3px"
                            onKeyPress={handleEnter}
                        />
                        <Flex>
                            <Select placeholder="Song" mr="3px">
                                <option value="Artist"> Artist </option>
                                <option value="Album"> Album </option>
                                <option value="Lyrics"> Lyrics </option>
                            </Select>
                            <IconButton
                                aria-label="searchButton"
                                icon={<MdSearch />}
                                onClick={algo}
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
                        {songs.map((song) => (
                            <ListItem
                                mt="3px"
                                bg="#000000"
                                borderRadius="md"
                                height="43px"
                                color="#FE53BB"
                                key={song}
                            >
                                <Grid templateColumns="repeat(20,1fr)" gap={6}>
                                    {/* <GridItem ml="10px" mt="5px">
                                        <ListIcon />
                                    </GridItem> */}
                                    <GridItem colStart={2} colEnd={15} mt="5px">
                                        <Text mt="2px">{song}</Text>
                                    </GridItem>

                                    <GridItem colStart={18} mt="2px" ml="120px">
                                        <IconButton
                                            aria-label="playButton"
                                            variant="ghost"
                                            size="md"
                                            icon={<MdPlayArrow />}
                                            onClick={() => play(song)}
                                        />
                                    </GridItem>
                                    <GridItem colStart={19} mt="2px" ml="50px">
                                        <IconButton
                                            aria-label="editButton"
                                            variant="ghost"
                                            size="md"
                                            icon={<MdEdit />}
                                            onClick={() => editSong(song)}
                                        />
                                    </GridItem>
                                    <GridItem colStart={20} mt="2px" ml="30px">
                                        <Popover>
                                            <PopoverTrigger>
                                                <IconButton
                                                    aria-label="deleteButton"
                                                    size="md"
                                                    mr="3px"
                                                    variant="ghost"
                                                    color="FE53BB"
                                                    icon={<MdDelete />}
                                                    onClick={() =>
                                                        deleteSong(song)
                                                    }
                                                ></IconButton>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverHeader>
                                                        You are about to delete a song
                                                    </PopoverHeader>
                                                    <PopoverCloseButton />
                                                    <PopoverBody>
                                                        <Button colorScheme="blue">
                                                            Button
                                                        </Button>
                                                    </PopoverBody>
                                                    <PopoverFooter justifyContent='center'>
                                                        Are you sure?
                                                    </PopoverFooter>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </GridItem>
                                </Grid>
                            </ListItem>
                        ))}
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
