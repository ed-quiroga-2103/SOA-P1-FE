import { Button, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <>
            <Center>
                <Stack justify="center">
                    <Text>This is a Landing</Text>
                    <Text>for our amazing website</Text>
                    <Text>The Karaoke App!</Text>
                    <Flex justify="center">
                        <Button
                            mr={3}
                            onClick={() => {
                                history.push('/login');
                            }}
                        >
                            Sing In!
                        </Button>
                        <Button
                            mr={3}
                            onClick={() => {
                                history.push('/register');
                            }}
                        >
                            Sing Up!
                        </Button>
                    </Flex>
                </Stack>
            </Center>
        </>
    );
};

export default Landing;
