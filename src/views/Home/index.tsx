import { Button } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <>
            This is the landing page
            <Button
                onClick={() => {
                    history.push('/login');
                }}
            >
                Login
            </Button>
        </>
    );
};

export default Landing;
