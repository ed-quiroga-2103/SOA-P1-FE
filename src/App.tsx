import { Box, Container } from '@chakra-ui/react';
import '@fontsource/alata';
import '@fontsource/roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LyricsEditor from './components/LyricsEditor/LyricsEditor';
import Navbar from './components/Navbar/Navbar';
import SongList from './components/SongList/SongList';
import Test from './components/test/Test';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Songs from './views/Songs';
import Profile from './views/Profile';
import SongEditor from './components/SongEditor/SongEditor';

function App() {
    return (
        <Router>
            <Navbar />
            <Box w="100%" p={4}>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                    <Route path="/my-profile">
                        <Profile />
                    </Route>
                    <Route path="/create-song">
                        <Container>
                            <SongEditor />
                        </Container>
                    </Route>
                    <Route path="/edit-song">
                        <Container>
                            <SongEditor editing={true} />
                        </Container>
                    </Route>
                    <Route path="/new-lyrics">
                        <LyricsEditor />
                    </Route>
                    <Route path="/edit-lyrics">
                        <LyricsEditor editing={true}/>
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/songs">
                        <Songs />
                    </Route>
                    <Route path="/">
                        {/* Gotta keep home last */}
                        <Home />
                    </Route>
                </Switch>
            </Box>
        </Router>
    );
}

export default App;
