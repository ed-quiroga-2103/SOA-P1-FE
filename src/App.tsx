import { Box, ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import store from './app/store';
import Login from './views/Login/login';
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';
import '@fontsource/alata';

const theme = extendTheme({
    fonts: {
        heading: 'Alata',
        body: 'Roboto',
    },
});

function App() {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <Navbar />
                    <Box w="100%" p={4}>
                        <Login />
                    </Box>
                </ChakraProvider>
            </Provider>
        </CookiesProvider>
    );
}

export default App;
