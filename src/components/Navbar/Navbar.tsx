import { HamburgerIcon } from '@chakra-ui/icons';
import { Grid, IconButton, useDisclosure } from '@chakra-ui/react';
import { Center, Flex, GridItem, Spacer, Text } from '@chakra-ui/layout';
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
            <Grid templateColumns="repeat(3,1fr)" bg="gray.900" padding="10px">
                <GridItem colSpan={1}>
                    <Flex h="100%">
                        <IconButton
                            marginTop="auto"
                            marginBottom="auto"
                            variant="outline"
                            colorScheme="alphaBlack"
                            color="white"
                            aria-label="Drawer Control"
                            icon={<HamburgerIcon />}
                            onClick={onOpen}
                        />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                    <Center>
                        {logged ? (
                            <NeonText
                                fontSize="2xl"
                                text="Karaoke App!"
                                color="white-on"
                            />
                        ) : (
                            <NeonText
                                fontSize="2xl"
                                text="Karaoke App!"
                                color="white-off"
                            />
                        )}
                    </Center>
                </GridItem>
            </Grid>
        </>
    );
};

export default Navbar;
