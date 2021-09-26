import { Button, Container, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
interface RegisterRedirectProps {}

const RegisterRedirect: FunctionComponent<RegisterRedirectProps> = () => {
    return (
        <>
            <Container>
                <Stack>
                    <Text margin="15px" fontSize="xl">
                        You dont have an account?
                    </Text>
                    <Button bg="gray.200">Sing Up!</Button>
                </Stack>
            </Container>
        </>
    );
};

export default RegisterRedirect;
