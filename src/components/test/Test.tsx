import { Container } from '@chakra-ui/layout';
import { FC } from 'react';
import About from '../Information/About';
import Contact from '../Information/Contact';

interface TestProps {}

const Test: FC<TestProps> = () => {
    return <>
       <About></About>
    </>;
};

export default Test;
