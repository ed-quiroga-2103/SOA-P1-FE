import { Button, Center, Flex, Stack, Text, Image } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <>
            <Center height='100%' bg = 'white'>
                <Stack justify="center" mt='300px'>
                    <Text color='blue'>Welcome to the landing page</Text>
                    <Text color='blue'>for our amazing website</Text>
                    <Text color='blue'>The Karaoke App!</Text>
                    <Flex justify="center" >
                        <Button
                            mr={3}
                            onClick={() => {
                                history.push('/login');
                            }}
                            bg ='orange'
                            color='white'
                            mb ='100px'
                        >
                            Sing In!
                        </Button>
                        <Button
                            mr={3}
                            onClick={() => {
                                history.push('/register');
                            }}
                            bg ='orange'
                            color='white'
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
