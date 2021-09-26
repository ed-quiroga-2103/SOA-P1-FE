import {
    Button,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import auth from '../../lib/auth';
import { login } from '../../redux/logged';

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const dispach = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    return (
        <>
            <Stack>
                <FormControl id="Username">
                    <FormLabel color="gray.200">Username</FormLabel>
                    <Input
                        bg="gray.200"
                        value={username}
                        onChange={handleEmail}
                        type="text"
                    />
                    <FormHelperText>
                        We'll never share your email.
                    </FormHelperText>
                </FormControl>
                <FormControl id="Password">
                    <FormLabel color="gray.200">Password</FormLabel>
                    <Input
                        bg="gray.200"
                        value={password}
                        onChange={handlePassword}
                        type="password"
                    />
                    <br />
                    <Center>
                        <Button
                            margin="10px"
                            bg="gray.200"
                            onClick={async () => {
                                const data = await auth.login({
                                    username,
                                    password,
                                });
                                if (data.accessToken) {
                                    dispach(login());
                                }
                            }}
                        >
                            Sign In
                        </Button>
                    </Center>
                </FormControl>
            </Stack>
        </>
    );
};

export default LoginForm;
