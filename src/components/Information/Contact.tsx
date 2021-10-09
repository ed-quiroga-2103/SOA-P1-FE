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
    Stack,
    Text
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = () => {
    return(
        <>
            <Stack>
                <Text fontFamily='cursive' fontSize="5xl"> We appreciate that you want to contact us. However.. </Text>
                <img src="https://en.meming.world/images/en/a/a3/We_Don%27t_Do_That_Here.jpg" />
            </Stack>
        </>
    )
}

export default Contact;