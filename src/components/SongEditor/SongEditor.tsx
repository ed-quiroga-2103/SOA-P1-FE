import {
    Button,
    Image,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Textarea,
    Box,
    Spacer,
    Divider,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api from '../../lib/api';

import {
    getAlbum,
    getArtist,
    getLyrics,
    getSongId,
    getSongName,
    setAlbum,
    setArtist,
    setSongName,
} from '../../redux/song';
import ErrorWithToolTip from '../ErrorWithToolTip/ErrorWithToolTip';

interface SongEditorProps {
    editing?: boolean;
}

const SongEditor: FC<SongEditorProps> = ({ editing = false }) => {
    const dispatch = useDispatch();
    const reduxName = useSelector(getSongName);
    const reduxArtist = useSelector(getArtist);
    const reduxAlbum = useSelector(getAlbum);
    const reduxLyrics = useSelector(getLyrics);
    const id = useSelector(getSongId);

    const history = useHistory();

    console.log(id);

    const [name, setStateName] = useState(reduxName);
    const [artist, setStateArtist] = useState(reduxArtist);
    const [album, setStateAlbum] = useState(reduxAlbum);
    const [lyrics, setStateLyrics] = useState(reduxLyrics);
    const [hasError, setStateHasError] = useState(false);

    const [file, setFile] = useState('');
    const handleNameChange = (event) => {
        setStateName(event.target.value);
        dispatch(setSongName(event.target.value));
    };

    const handleArtistChange = (event) => {
        setStateArtist(event.target.value);
        dispatch(setArtist(event.target.value));
    };

    const handleAlbumChange = (event) => {
        setStateAlbum(event.target.value);
        dispatch(setAlbum(event.target.value));
    };

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        const reader = new FileReader();
        const url = reader.readAsDataURL(event.target.files[0]);
        console.log(url);
        console.log(reader.result);
        setFile('');
    };
    const handleLyrics = () => {
        if (editing) {
            history.push('/edit-lyrics');
        } else {
            history.push('/new-lyrics');
        }
    };

    const full = () => {
        if (name == '' || artist == '' || album == '' || lyrics == '')
            return false;
        else return true;
    };
    const confirmChanges = async () => {
        console.log(full());
        if (full()) {
            if (editing) {
                console.log('put song');
                await api.putSong({
                    name,
                    artist,
                    album,
                    lyrics,
                    _id: id,
                });
            } else {
                console.log('post song');
                await api.postSong({
                    name: name,
                    artist: artist,
                    album: album,
                    lyrics: lyrics,
                });
            }
            history.push('/songs');
        } else {
            setStateHasError(true);
        }
    };

    return (
        <>
            <Stack>
                <FormControl id="name">
                    <FormLabel color="black">Name</FormLabel>
                    <Input
                        bg="gray.200"
                        value={name}
                        onChange={handleNameChange}
                        type="text"
                    />
                </FormControl>
                <FormControl id="artist">
                    <FormLabel color="black">Artist</FormLabel>
                    <Input
                        bg="gray.200"
                        value={artist}
                        onChange={handleArtistChange}
                        type="text"
                    />
                </FormControl>
                <FormControl id="album">
                    <FormLabel color="black">Album</FormLabel>
                    <Input
                        bg="gray.200"
                        value={album}
                        onChange={handleAlbumChange}
                        type="text"
                    />
                </FormControl>
                <FormControl id="audioFile">
                    <FormLabel color="black">Audio File</FormLabel>
                    <Input
                        variant="unstyled"
                        onChange={handleFileChange}
                        type="file"
                    />
                </FormControl>
                <FormControl id="lyrics">
                    <FormLabel color="black">Lyrics</FormLabel>
                    <Textarea
                        bg="gray.200"
                        readOnly
                        resize="none"
                        defaultValue={lyrics}
                    ></Textarea>
                    <Flex justify="left" margin="10px">
                        <Button onClick={handleLyrics}>Edit lyrics!</Button>
                    </Flex>
                </FormControl>
                {file.length >= 1 ? (
                    <Image boxSize="100px" objectFit="cover" src={file[0]} />
                ) : undefined}
                <Box>
                    {hasError ? (
                        <ErrorWithToolTip
                            error="Something is wrong with your data!"
                            tip="Please make sure that all fields are filled with the corresponding information!"
                        />
                    ) : undefined}
                </Box>
                <Divider />
                <Flex justify="right">
                    <Button
                        onClick={() => {
                            history.push('/songs');
                        }}
                    >
                        Back
                    </Button>
                    <Spacer />
                    <Button
                        onClick={() => {
                            setStateHasError(false);
                            confirmChanges();
                        }}
                    >
                        Confirm changes!
                    </Button>
                </Flex>
            </Stack>
        </>
    );
};

export default SongEditor;
