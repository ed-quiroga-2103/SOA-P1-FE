import { Button, Center, Container, Flex, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import UserEditor from '../../components/UserEditor/UserEditor';
import auth from '../../lib/auth';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();

    const mochi = new Cookies().get('mochi');
    if (!mochi) {
        history.push('/login');
    } else if (auth.isTokenExpired(mochi.accessToken)) {
        new Cookies().remove('mochi');
        history.push('/login');
    }
    return (
        <>
            <Container>
                <UserEditor />
            </Container>
        </>
    );
};

export default Landing;
