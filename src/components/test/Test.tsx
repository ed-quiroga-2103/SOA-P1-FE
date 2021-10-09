import { Container } from '@chakra-ui/layout';
import { FC } from 'react';
import AudioPlayer from '../AudioPlayer/Player';
import About from '../Information/About';
import Contact from '../Information/Contact';

interface TestProps {}

const Test: FC<TestProps> = () => {
    return <>
    <Container>
       <AudioPlayer/>
    </Container>
    </>;
};

export default Test;
