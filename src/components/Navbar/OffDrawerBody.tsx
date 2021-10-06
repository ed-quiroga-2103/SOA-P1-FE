import { Container, Flex, Link, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';

interface OffDrawerBodyProps {
    action: () => void;
}

const OffDrawerBody: FC<OffDrawerBodyProps> = ({ action }) => {
    const history = useHistory();

    return (
        <>
            <br />
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

export default OffDrawerBody;
