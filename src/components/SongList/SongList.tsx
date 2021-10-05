import {
    Box, Container,
    Flex, Grid,
    GridItem, Icon, Input, List, ListIcon, ListItem, Spacer, Text, Button,
    Popover, PopoverTrigger, Portal, PopoverContent, PopoverHeader, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverFooter
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { MdDelete, MdEdit, MdPlayArrow, MdAdd, MdArrowRight, MdArrowLeft } from "react-icons/md";


interface SongListProps{}

const SongList: FunctionComponent<SongListProps> = () => {
    const songs = ['Bohemian Rhapsody', 'Nunca es Suficiente', 'If I aint got you']
    var pages = 3;
    const comp = [];
    
    for (let i = 0; i <pages; i++){
        var j = i+1;
        comp.push(<Button key={i} size="sm" mt="4px" mr="3px" variant='ghost' color="#35212A"> {j} </Button>)
    }

    function play(algo){
        console.log("Song is playing: "+ algo)
    }

    function deleteSong(algo){
        console.log("Deleting song: "+ algo)
    }

    function editSong(algo){
        console.log("Editting song: "+ algo)
    }

    function addSong(){
        console.log("we are adding a new song")
    }

    return(
        <>
            <Container maxW="wxl">
                <Flex boxSize="wxl">
                    <Text p="4" fontSize="3xl" color="#FF61BE"> SONGS </Text>
                    <Spacer />
                    <Input maxWidth= '250px' placeholder="Search"/>
                        
                </Flex>
                <hr/>
                <Box padding="4" bg="#FF61BE" maxW="wxl">
                    <Flex justify='right' mb="7px">
                        <Button 
                            size="sm"
                            rightIcon= {<MdAdd/>} 
                            onClick= {()=> addSong()}
                            >Add 
                        </Button>
                    </Flex>
                    <List>
                        {songs.map((song)=> (
                            <ListItem mt='3px' bg="#3B55CE" borderRadius="md" height='43px' color="#FFFFFF" key={song}>
                                <Grid templateColumns="repeat(20,1fr)" gap = {6}>
                                    <GridItem ml = '10px' mt="5px">
                                        <ListIcon/ >
                                    </GridItem>
                                    <GridItem colStart={2} colEnd = {15} mt="5px">
                                        <Text mt="2px">{song}</Text>
                                    </GridItem>
                                    <GridItem colStart={18} mt = "5px" ml ="120px">
                                        <Icon as={MdPlayArrow} onClick ={() => play(song)} />
                                    </GridItem>
                                    <GridItem colStart={19} mt = "5px" ml ="50px">
                                        <Icon as={MdEdit} onClick ={() => editSong(song)}/>
                                    </GridItem>
                                    <GridItem colStart={20} mt = "5px" ml ="30px">
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button 
                                                    size="sm" 
                                                    mr="3px"
                                                    variant="ghost" 
                                                    color="white"
                                                    
                                                    rightIcon = {<MdDelete/>}
                                                    onClick={()=> deleteSong(song)}
                                                    > 
                                                </Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverHeader>Header</PopoverHeader>
                                                <PopoverCloseButton />
                                                <PopoverBody>
                                                    <Button colorScheme="blue">Button</Button>
                                                </PopoverBody>
                                                <PopoverFooter>This is the footer</PopoverFooter>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </GridItem>

                                </Grid>
                                
                            </ListItem>
                        ))}
                    </List>
                    <Flex justify="right" mt="10px" >
                        <Icon as={MdArrowLeft} boxSize={10} color="#35212A" />
                            {comp}
                        <Icon as={MdArrowRight} boxSize={10} color="#35212A" />
                    </Flex>
                </Box>
            </Container>
        </>
    )
};
export default SongList;