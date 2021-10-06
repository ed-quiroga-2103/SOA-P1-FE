import React, { FC, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import auth from '../../lib/auth';

interface PasswordEditorProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const PasswordEditor: FC<PasswordEditorProps> = ({
    isOpen,
    onOpen,
    onClose,
}) => {
    const toast = useToast();

    const [prevPass, setPrevPass] = useState('');

    const handlePrevPass = (event) => {
        setPrevPass(event.target.value);
    };

    const [newPass, setNewPass] = useState('');

    const handleNewPass = (event) => {
        setNewPass(event.target.value);
    };

    const [confirmPass, setConfirmPass] = useState('');

    const handleConfirmPass = (event) => {
        setConfirmPass(event.target.value);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Password change</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Previous Password</FormLabel>
                            <Input
                                value={prevPass}
                                onChange={handlePrevPass}
                                type="password"
                                placeholder="*******"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                value={newPass}
                                onChange={handleNewPass}
                                type="password"
                                placeholder="*******"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                value={confirmPass}
                                onChange={handleConfirmPass}
                                type="password"
                                placeholder="*******"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={async () => {
                                if (confirmPass === newPass) {
                                    const updated = await auth.changePassword(
                                        prevPass,
                                        newPass
                                    );

                                    if (updated) {
                                        toast({
                                            title: `Success!`,
                                            status: 'success',
                                            isClosable: true,
                                        });
                                        onClose();
                                    } else {
                                        toast({
                                            title: `Wrong password!`,
                                            status: 'error',
                                            isClosable: true,
                                        });
                                    }
                                } else {
                                    toast({
                                        title: `The new password doesn't match!`,
                                        status: 'error',
                                        isClosable: true,
                                    });
                                }
                            }}
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PasswordEditor;
