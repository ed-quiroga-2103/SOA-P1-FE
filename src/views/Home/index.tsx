import { Button, Center, Flex, Stack, Text, Image } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <>
            <Center backgroundImage="https://p4.wallpaperbetter.com/wallpaper/879/1018/485/blur-bokeh-close-concert-wallpaper-preview.jpg" height='486px'>
                <Stack justify="center" mt='300px'>
                    <Text color='#08F7FE'>Welcome to the landing page</Text>
                    <Text color='#08F7FE'>for our amazing website</Text>
                    <Text color='#08F7FE'>The Karaoke App!</Text>
                    <Flex justify="center" >
                        <Button
                            mr={3}
                            onClick={() => {
                                history.push('/login');
                            }}
                            bg ='#FE53BB'
                            color='#08F7FE'
                        >
                            Sing In!
                        </Button>
                        <Button
                            mr={3}
                            onClick={() => {
                                history.push('/register');
                            }}
                            bg ='#FE53BB'
                            color='#08F7FE'
                        >
                            Sing Up!
                        </Button>
                    </Flex>
                </Stack>
            </Center>
            <Flex overflow='hidden'>
            <Image src="https://p4.wallpaperbetter.com/wallpaper/879/1018/485/blur-bokeh-close-concert-wallpaper-preview.jpg"/>
            <Image src="https://p4.wallpaperbetter.com/wallpaper/879/1018/485/blur-bokeh-close-concert-wallpaper-preview.jpg"/>
            <Image src="https://p4.wallpaperbetter.com/wallpaper/879/1018/485/blur-bokeh-close-concert-wallpaper-preview.jpg"/>
            </Flex>
        </>
    );
};

export default Landing;
