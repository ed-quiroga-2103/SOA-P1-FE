import { Center, Grid, GridItem } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterRedirect from '../../components/LoginForm/RegisterRedirect';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
    const content = (
        <Center>
            <Grid
                padding="10px"
                bg="#3B55CE"
                templateColumns="repeat(2, 1fr)"
                gap={2}
                borderRadius="10px"
            >
                <GridItem paddingTop="10px" colSpan={1} bg="#3B55CE">
                    <LoginForm />
                </GridItem>
                <GridItem
                    colSpan={1}
                    bg="#FFD3F3"
                    borderTopRightRadius="5px"
                    borderBottomRightRadius="5px"
                    paddingTop="43px"
                >
                    <RegisterRedirect />
                </GridItem>
            </Grid>
        </Center>
    );

    return (
        <>
            <Grid templateRows="repeat(6,1fr)" templateColumns="repeat(6,1fr)">
                <GridItem colSpan={6} rowSpan={1} />
                <GridItem colSpan={1} />
                <GridItem colSpan={4} rowSpan={4}>
                    {content}
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;
