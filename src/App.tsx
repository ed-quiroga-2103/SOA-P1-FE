import { Box, ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Test from './components/test/Test';

function App() {
    return (
        <ChakraProvider>
            <Box w="100%" p={4}>
                <Test />
            </Box>
        </ChakraProvider>
    );
}

export default App;
