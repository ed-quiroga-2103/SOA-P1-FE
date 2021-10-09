import {
    Box,
    Grid,
    Text
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface HeaderProps {
    mt?:string
}

const Header : FunctionComponent<HeaderProps> = () =>{

    return(
        <>
            <Grid templateColumns="repeat(7, 1fr)" gap={4}>
                <Box
                    w='770px'
                    h='5px'
                    bg ='gray'
                    borderRadius='2xl'
                    gridColumnStart={1}
                    gridColumnEnd={3}
                    ml='20px'
                />

                    
                <Box 
                    w="100%" 
                    h="10"  
                    gridColumnStart={4} 
                    mt='-50px'
                    > 
                        <Text
                        color='gray'
                        fontSize='6xl'
                        >
                            About Us 
                        </Text>
                </Box>
                    
                <Box
                    w='770px'
                    h='5px'
                    bg ='gray'
                    borderRadius='2xl'
                    gridColumnStart={5}
                    gridColumnEnd={7}
                    
                />
            </Grid>
        </>
    )
}

export default Header;