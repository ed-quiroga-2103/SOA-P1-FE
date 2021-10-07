import { Button, Container, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LogInRedirectProps {}

const LogInRedirect: FunctionComponent<LogInRedirectProps> = () => {
    const history = useHistory();
    return (
        <>
            <Container>
                <Stack>
                    <Text margin="15px" fontSize="xl">
                        Already have an account?
                    </Text>
                    <Button
                        bg="#3B55CE"
                        color="white"
                        onClick={() => {
                            history.push('/login');
                        }}
                    >
                        Log in!
                    </Button>
                </Stack>
            </Container>
        </>
    );
};

export default LogInRedirect;
