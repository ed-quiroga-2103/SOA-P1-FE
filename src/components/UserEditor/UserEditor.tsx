import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spacer,
    Stack,
    Switch,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import keycloak from '../../lib/keycloak';
import {
    getEmail,
    getLastname,
    getName,
    getPremium,
    setEmail,
    setLastname,
    setName,
    setPremium,
} from '../../redux/user';
import PasswordEditor from './PasswordEditor';
import { useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';

interface UserEditorProps {}

const UserEditor: FC<UserEditorProps> = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const dispach = useDispatch();
    const [name, setStateName] = useState(useSelector(getName));
    const [lastName, setStateLastName] = useState(useSelector(getLastname));
    const [email, setStateEmail] = useState(useSelector(getEmail));
    const [password, setStatePassword] = useState('');
    const [premium, setStatePremium] = useState(useSelector(getPremium));

    const handleName = (event) => setStateName(event.target.value);
    const handleLastName = (event) => setStateLastName(event.target.value);
    const handleEmail = (event) => setStateEmail(event.target.value);
    const handlePassword = (event) => setStatePassword(event.target.value);
    const handlePremium = (event) => {
        setStatePremium(event.target.checked);
    };

    const confirmChanges = () => {
        const mochi = new Cookies().get('mochi');

        keycloak.updateUser(
            { name, lastName, email, username: undefined },
            premium,
            mochi.accessToken
        );

        dispach(setName(name));
        dispach(setLastname(lastName));
        dispach(setEmail(email));
        dispach(setPremium(premium));
        toast({
            title: `Success!`,
            status: 'success',
            isClosable: true,
        });
        history.push('/');
    };

    return (
        <Stack>
            <FormControl id="name">
                <FormLabel color="black">Name</FormLabel>
                <Input
                    value={name}
                    onChange={handleName}
                    bg="gray.200"
                    type="text"
                />
            </FormControl>
            <FormControl id="lastName">
                <FormLabel color="black">Last Name</FormLabel>
                <Input
                    value={lastName}
                    onChange={handleLastName}
                    bg="gray.200"
                    type="text"
                />
            </FormControl>
            <FormControl id="email">
                <FormLabel color="black">E-mail</FormLabel>
                <Input
                    value={email}
                    onChange={handleEmail}
                    bg="gray.200"
                    type="text"
                />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                    Premium User?
                </FormLabel>
                <Switch
                    defaultChecked={premium === 'true'}
                    onChange={handlePremium}
                    id="email-alerts"
                />
            </FormControl>
            <br />
            <Flex justify="left">
                <Button onClick={onOpen} colorScheme="red">
                    Change Password
                </Button>
                <Spacer />
                <Button onClick={confirmChanges}>Confirm changes!</Button>
            </Flex>
            <PasswordEditor isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Stack>
    );
};

export default UserEditor;
