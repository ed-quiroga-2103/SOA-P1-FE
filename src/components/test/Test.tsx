import { FC } from 'react';
import { Container, Button, Stack } from '@chakra-ui/react';
import UserEditor from '../UserEditor/UserEditor';

interface TestProps {}

const Test: FC<TestProps> = () => {
    return (
        <>
            <Container>
                <UserEditor />
            </Container>
        </>
    );
};

export default Test;
