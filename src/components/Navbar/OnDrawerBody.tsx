import { EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Container,
    Flex,
    Icon,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BiUser } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

interface OnDrawerBodyProps {
    action: () => void;
}

const OnDrawerBody: FC<OnDrawerBodyProps> = ({ action }) => {
    const history = useHistory();

    return (
        <>
            <Box bg="#FF61BE" width="100%" height="100px">
                <Flex height="100%" justify="center" alignSelf="center">
                    <Center>
                        <Stack justify="center">
                            <Flex justify="center">
                                <Icon boxSize={8} as={BiUser} />
                            </Flex>
                            <Text>USERNAME</Text>
                        </Stack>
                    </Center>
                </Flex>
            </Box>
            <Container padding="10px" paddingX="1000px">
                <Link
                    onClick={() => {
                        action();
                        history.push('/');
                    }}
                >
                    <Flex marginBottom="10px" align="center">
                        <EditIcon marginRight="10px" />
                        <Text fontSize="lg">Home</Text>
                    </Flex>
                </Link>
                <Link
                    onClick={() => {
                        action();
                        history.push('/songs');
                    }}
                >
                    <Flex marginBottom="10px" align="center">
                        <EditIcon marginRight="10px" />
                        <Text fontSize="lg">Songs</Text>
                    </Flex>
                </Link>
                <Link
                    onClick={() => {
                        action();
                        history.push('/my-profile');
                    }}
                >
                    <Flex marginBottom="10px" align="center">
                        <EditIcon marginRight="10px" />
                        <Text fontSize="lg">My Profile</Text>
                    </Flex>
                </Link>
                <Link>
                    <Flex marginBottom="10px" align="center">
                        <EditIcon marginRight="10px" />
                        <Text fontSize="lg">About</Text>
                    </Flex>
                </Link>
                <Link>
                    <Flex marginBottom="10px" align="center">
                        <EditIcon marginRight="10px" />
                        <Text fontSize="lg">Contact</Text>
                    </Flex>
                </Link>
            </Container>
        </>
    );
};

export default OnDrawerBody;
