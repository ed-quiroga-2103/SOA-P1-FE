import {
    Button,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import auth from '../../lib/auth';
import { login } from '../../redux/logged';
import { useHistory } from 'react-router-dom';
import keycloak from '../../lib/keycloak';
import {
    setEmail,
    setLastname,
    setName,
    setPremium,
    setUsername,
} from '../../redux/user';

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const history = useHistory();
    const toast = useToast();

    const dispach = useDispatch();
    const [username, setStateUsername] = useState('');
    const [password, setStatePassword] = useState('');

    const handleEmail = (event) => setStateUsername(event.target.value);
    const handlePassword = (event) => setStatePassword(event.target.value);

    async function logIn() {
        const tokenData = await auth.login({
            username,
            password,
        });
        if (tokenData.accessToken) {
            const { data } = (await keycloak.getUserById(
                tokenData.accessToken
            )) as any;
            const user = data;

            dispach(setName(user.firstName));
            dispach(setLastname(user.lastName));
            dispach(setUsername(user.username));
            dispach(setEmail(user.email));
            dispach(setPremium(user.attributes.premium[0]));

            dispach(login());
            history.push('/');
        } else {
            toast({
                title: `Wrong username or password!`,
                status: 'error',
                isClosable: true,
            });
            return;
        }
    }
    function handleEnter(e) {
        var key = e.keyCode || e.which;
        if (key == 13) {
            logIn();
        }
    }

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
                        onKeyPress={handleEnter}
                        type="password"
                    />
                    <br />
                    <Center>
                        <Button
                            margin="10px"
                            color="white"
                            bg="#FF61BE"
                            onClick={logIn}
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
