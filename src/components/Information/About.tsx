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
                bg='#08F7FE' 
                width="100%"
                height="87vh"
                overflow='hidden'
                >
                <Stack>
                    <Grid templateColumns="repeat(9,1fr)" gap={4} color='gray.600' ml='160px' mt='50px' >
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
                            w='20%'
                            h='100%'
                            ml='200px'
                            mt='100px'
                            color='gray.600'
                        >
                            {about}
                        </Box>
                        <Spacer/>
                        <Box
                            w='20%'
                            h='100%'
                            mr='200px'
                            mt='100px'
                            color='gray.600'
                            >
                                We'll eventually have more information here, we promise!
                        </Box>
                    </Flex>
                </Stack>            
            </Box>
        </>
    )
}

export default About;