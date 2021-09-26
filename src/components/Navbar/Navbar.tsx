import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { Center, Flex, Spacer, Text } from '@chakra-ui/layout';
import { FunctionComponent } from 'react';
import NavDrawer from './NavDrawer';
import NeonText from '../NeonText/NeonText';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { isLogged, login } from '../../redux/logged';

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cookies = new Cookies();
    const dispatch = useDispatch();
    if (cookies.get('mochi')) {
        dispatch(login());
    }

    const logged = useSelector(isLogged);

    return (
        <>
            <NavDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <Flex bg="gray.900" padding="10px">
                <IconButton
                    variant="outline"
                    colorScheme="alphaBlack"
                    color="white"
                    aria-label="Drawer Control"
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                />
                <Spacer />
                <Center alignContent="center" justifyContent="center">
                    {logged ? (
                        <NeonText text="Logged In!" />
                    ) : (
                        <NeonText text="Sign In!" />
                    )}
                </Center>
            </Flex>
        </>
    );
};

export default Navbar;
