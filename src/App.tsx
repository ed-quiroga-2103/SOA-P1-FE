import { Box } from '@chakra-ui/react';
import '@fontsource/alata';
import '@fontsource/roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Login from './views/Login';

function App() {
    return (
        <Router>
            <Navbar />
            <Box w="100%" p={4}>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Box>
        </Router>
    );
}

export default App;
