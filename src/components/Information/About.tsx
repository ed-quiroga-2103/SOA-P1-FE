import {
    Box,
    Stack,
    Spacer,
    Flex,
    Text,
    Grid,
    GridItem

    
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import Header from './Header';

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    const about = "We are a bunch of university students scraping time to make the best projects we can. "+
                  "As of today we stand very close to finishing the career, yet we have close to no clue what will happen next. "+
                  "We hope this about page is good enough for your taste. "+
                  "Enjoy the app!";
    return(
        <>
            <Box 
                bg='gray.200' 
                width={1890} 
                height={840} 
                overflow='hidden'           
                backgroundImage="https://get.wallhere.com/photo/1900x1080-px-astronaut-flag-simple-simple-background-space-x-px-668556.jpg"
                >
                <Stack>
                    <Grid templateColumns="repeat(9,1fr)" gap={4} color='gray.100' ml='160px' mt='50px' >
                        <GridItem colStart={1} colEnd={3}>Eduardo Quiroga: </GridItem>
                        <GridItem colStart={1} colEnd={3} rowStart={2}>ed.quiroga2103@gmail.com </GridItem>
                        <GridItem colStart={3} colEnd={5}>Pablo Mora</GridItem>
                        <GridItem colStart={3} colEnd={5} rowStart={2}>papmora@gmail.com </GridItem>
                        <GridItem colStart={6} colEnd={8} ml='50px'>Alex Marin</GridItem>
                        <GridItem colStart={6} colEnd={8} ml='50px' rowStart={2}>manuelmarinlopez07@gmail.com </GridItem>
                        <GridItem colStart={8} colEnd={10} ml='40px'>Josue Araya</GridItem>
                        <GridItem colStart={8} colEnd={10} ml='40px' rowStart={2}>josuaraya@gmail.com </GridItem>
                    </Grid>

                    <Header />
                    
                    <Flex >
                        <Box
                            w='400px'
                            h='700px'
                            ml='200px'
                            mt='100px'
                            color='gray.100'
                        >
                            {about}
                        </Box>
                        <Spacer/>
                        <Box
                            w='400px'
                            h='700px'
                            mr='200px'
                            mt='100px'
                            color='gray.100'
                            >
                                Placeholder for more text later. We are filling a whole line to see
                        </Box>
                    </Flex>
                </Stack>            
            </Box>
        </>
    )
}

export default About;