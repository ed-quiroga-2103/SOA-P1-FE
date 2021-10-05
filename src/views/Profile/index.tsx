import { Button, Center, Container, Flex, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import UserEditor from '../../components/UserEditor/UserEditor';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <>
            <Container>
                <UserEditor />
            </Container>
        </>
    );
};

export default Landing;
