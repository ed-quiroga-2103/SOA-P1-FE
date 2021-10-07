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

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
    const dispach = useDispatch();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleName = (event) => setName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleUsername = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

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
                            bg="#FF61BE"
                            color="white"
                            onClick={async () => {
                                // const data = await auth.register({
                                //     name,
                                //     lastName,
                                //     email,
                                //     username,
                                //     password,
                                // });
                                await api.postUser();
                                console.log('posted');
                                // if (data.accessToken) {
                                //     dispach(login());
                                // }
                            }}
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
