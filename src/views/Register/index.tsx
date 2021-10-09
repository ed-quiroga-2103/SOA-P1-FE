import { Center, Grid, GridItem } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LogInRedirect from '../../components/RegisterForm/LogInRedirect';

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
    const content=(
        <Center>
                <Grid
                    padding="10px"
                    bg="#3B55CE"
                    templateColumns="repeat(2, 1fr)"
                    gap={2}
                    borderRadius="10px"
                >
                    <GridItem
                        colSpan={1}
                        bg="#FFD3F3"
                        borderTopRightRadius="5px"
                        borderBottomRightRadius="5px"
                        paddingTop="160px"
                    >
                        <LogInRedirect />
                    </GridItem>
                    <GridItem paddingTop="10px" colSpan={1} bg="#3B55CE">
                        <RegisterForm />
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
export default Register;