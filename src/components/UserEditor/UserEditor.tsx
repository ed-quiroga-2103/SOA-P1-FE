import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spacer,
    Stack,
    Switch,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
interface UserEditorProps {}

const UserEditor: FC<UserEditorProps> = () => {
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
        <Stack>
            <FormControl id="name">
                <FormLabel color="black">Name</FormLabel>
                <Input bg="gray.200" type="text" />
            </FormControl>
            <FormControl id="lastName">
                <FormLabel color="black">Last Name</FormLabel>
                <Input bg="gray.200" type="text" />
            </FormControl>
            <FormControl id="email">
                <FormLabel color="black">E-mail</FormLabel>
                <Input bg="gray.200" type="text" />
            </FormControl>
            <FormControl id="Username">
                <FormLabel color="black">Username</FormLabel>
                <Input
                    bg="gray.200"
                    value={username}
                    onChange={handleUsername}
                    type="text"
                />
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                    Premium User?
                </FormLabel>
                <Switch id="email-alerts" />
            </FormControl>
            <br />
            <Flex justify="left">
                <Button colorScheme="red">Change Password</Button>
                <Spacer />
                <Button>Confirm changes!</Button>
            </Flex>
        </Stack>
    );
};

export default UserEditor;
