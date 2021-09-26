import { Button } from '@chakra-ui/button';
import {
    FormControl,
    FormHelperText,
    FormLabel,
} from '@chakra-ui/form-control';
import { Input, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import auth from '../../lib/auth';

interface TestProps {}

const Test: FC<TestProps> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useState(undefined);
    const [status, setStatus] = useState(200);

    const handleEmail = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    return (
        <>
            <Text fontSize="4xl">KeyCloak Test</Text>
            <br />
            <FormControl id="Username">
                <FormLabel>Username</FormLabel>
                <Input value={username} onChange={handleEmail} type="text" />
                <FormHelperText>We'll never share your email.</FormHelperText>
                <br />
                <FormLabel>Password</FormLabel>
                <Input
                    value={password}
                    onChange={handlePassword}
                    type="password"
                />
                <FormHelperText>
                    Your password will be encrypted for security
                </FormHelperText>
                <br />
                <Button
                    colorScheme="blue"
                    onClick={async () => {
                        const data = await auth.register({
                            username,
                            password,
                        });
                        if (data.status === 200) {
                            setToken(data.accessToken);
                        }
                        setStatus(data.status);
                    }}
                >
                    Register
                </Button>
                <Button
                    colorScheme="red"
                    onClick={async () => {
                        const data = await auth.login({
                            username,
                            password,
                        });
                        if (data.accessToken) {
                            setToken(data.accessToken);
                        }
                        setStatus(data.status);
                    }}
                >
                    Login
                </Button>
            </FormControl>
            <br />
            <p>{status < 300 ? `Nice` : 'Error'}</p>
            <p>{token ? `Token: ${token}` : 'Not logged'}</p>
        </>
    );
};

export default Test;
