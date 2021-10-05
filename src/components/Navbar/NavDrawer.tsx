import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import OffDrawerBody from './OffDrawerBody';
import OnDrawerBody from './OnDrawerBody';

interface NavDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const NavDrawer: FunctionComponent<NavDrawerProps> = ({
    isOpen,
    onOpen,
    onClose,
}) => {
    const history = useHistory();

    const btnRef = React.useRef();

    let logged = false;

    const cookies = new Cookies();
    if (cookies.get('mochi')) {
        logged = true;
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader color="white" bg="#3B55CE">
                        Karaoke App
                    </DrawerHeader>

                    <DrawerBody color="white" padding="0" bg="#3B55CE">
                        {logged ? (
                            <OnDrawerBody action={onClose} />
                        ) : (
                            <OffDrawerBody action={onClose} />
                        )}
                    </DrawerBody>

                    {logged ? (
                        <DrawerFooter color="white" bg="#3B55CE">
                            <Button
                                bg="#FF61BE"
                                onClick={() => {
                                    cookies.remove('mochi');
                                    history.push('/');
                                    window.location.reload();
                                }}
                            >
                                Logout
                            </Button>
                        </DrawerFooter>
                    ) : (
                        <DrawerFooter color="white" bg="#3B55CE">
                            <Button
                                bg="#FF61BE"
                                mr={4}
                                onClick={() => {
                                    onClose();
                                    history.push('/login');
                                }}
                            >
                                Sign in!
                            </Button>
                            <Button bg="#FF61BE">Sing up!</Button>
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default NavDrawer;
