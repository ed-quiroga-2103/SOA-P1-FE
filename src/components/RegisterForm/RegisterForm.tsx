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
import api from '../../lib/api';
import auth from '../../lib/auth';
import { login } from '../../redux/logged';
import {
    setEmail,
    setId,
    setLastname,
    setName,
    setPremium,
    setUsername,
} from '../../redux/user';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
    const dispach = useDispatch();
    const history = useHistory();
    const toast = useToast();

    const [name, setStateName] = useState('');
    const [lastName, setStateLastName] = useState('');
    const [email, setStateEmail] = useState('');
    const [username, setStateUsername] = useState('');
    const [password, setStatePassword] = useState('');

    const handleName = (event) => setStateName(event.target.value);
    const handleLastName = (event) => setStateLastName(event.target.value);
    const handleEmail = (event) => setStateEmail(event.target.value);
    const handleUsername = (event) => setStateUsername(event.target.value);
    const handlePassword = (event) => setStatePassword(event.target.value);

    const handleRegister = async () => {
        const authData = await auth.register({
            name,
            lastName,
            email,
            username,
            password,
            premium: false,
        });

        if (authData.status >= 400) {
            toast({
                title: `The username or email already in use!`,
                status: 'error',
                isClosable: true,
            });
            return;
        }
        const user = await api.postUser({
            name,
            email,
            premium: false,
            lastname: lastName,
        });

        if (user) {
            const data = user.data as any;

            dispach(setId(data._id));
            dispach(setName(data.name));
            dispach(setPremium(data.premium));
            dispach(setEmail(data.email));
            dispach(setUsername(username));
            dispach(setLastname(data.lastname));
        }

        if (authData.accessToken) {
            dispach(login());
        }
        history.push('/');
    };

    return (
        <>
            <Stack>
                <FormControl id="lastName">
                    <FormLabel color="gray.200">Name</FormLabel>
                    <Input
                        bg="gray.200"
                        value={name}
                        onChange={handleName}
                        type="text"
                    />
                </FormControl>
                <FormControl id="lastName">
                    <FormLabel color="gray.200">Last Name</FormLabel>
                    <Input
                        bg="gray.200"
                        value={lastName}
                        onChange={handleLastName}
                        type="text"
                    />
                </FormControl>
                <FormControl id="Email">
                    <FormLabel color="gray.200">Email</FormLabel>
                    <Input
                        bg="gray.200"
                        value={email}
                        onChange={handleEmail}
                        type="text"
                    />
                    <FormHelperText>
                        We'll never share your email.
                    </FormHelperText>
                </FormControl>
                <FormControl id="Username">
                    <FormLabel color="gray.200">Username</FormLabel>
                    <Input
                        bg="gray.200"
                        value={username}
                        onChange={handleUsername}
                        type="text"
                    />
                    <FormHelperText>Time to be creative</FormHelperText>
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
                            onClick={handleRegister}
                        >
                            Sign Up!
                        </Button>
                    </Center>
                </FormControl>
            </Stack>
        </>
    );
};
export default RegisterForm;
