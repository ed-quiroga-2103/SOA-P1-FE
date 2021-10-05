import { Button, Container, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface RegisterRedirectProps {}

const RegisterRedirect: FunctionComponent<RegisterRedirectProps> = () => {
    const history = useHistory();
    return (
        <>
            <Container>
                <Stack>
                    <Text margin="15px" fontSize="xl">
                        You dont have an account?
                    </Text>
                    <Button
                        bg="#3B55CE"
                        color="white"
                        onClick={() => {
                            history.push('/register');
                        }}
                    >
                        Sing Up!
                    </Button>
                </Stack>
            </Container>
        </>
    );
};

export default RegisterRedirect;
