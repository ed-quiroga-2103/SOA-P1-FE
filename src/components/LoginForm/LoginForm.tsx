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
import { useHistory } from 'react-router-dom';

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const history = useHistory();

    const dispach = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    return (
        <>
            <Stack>
                <FormControl id="Username">
                    <FormLabel color="white">Username</FormLabel>
                    <Input
                        bg="gray.200"
                        value={username}
                        onChange={handleEmail}
                        type="text"
                    />
                    <FormHelperText color="white">
                        We'll never share your email.
                    </FormHelperText>
                </FormControl>
                <FormControl id="Password">
                    <FormLabel color="white">Password</FormLabel>
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
                            color="white"
                            bg="#FF61BE"
                            onClick={async () => {
                                const data = await auth.login({
                                    username,
                                    password,
                                });
                                if (data.accessToken) {
                                    dispach(login());
                                    history.push('/');
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
