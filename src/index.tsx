import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './app/store';

const theme = extendTheme({
    fonts: {
        heading: 'Alata',
        body: 'Roboto',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
