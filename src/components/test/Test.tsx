import { FC } from 'react';
import { Container } from '@chakra-ui/react';
import SongEditor from '../SongEditor/SongEditor';

interface TestProps {}

const Test: FC<TestProps> = () => {
    return (
        <>
            <Container>
                <SongEditor />
            </Container>
        </>
    );
};

export default Test;
