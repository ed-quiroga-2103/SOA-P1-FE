import {
    Button,
    Image,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Textarea,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAlbum, getArtist, getLyrics, getName } from '../../redux/song';

interface SongEditorProps {}

const SongEditor: FC<SongEditorProps> = () => {
    const dispatch = useDispatch();
    const reduxName = useSelector(getName);
    const reduxArtist = useSelector(getArtist);
    const reduxAlbum = useSelector(getAlbum);
    const reduxLyrics = useSelector(getLyrics);

    const history = useHistory();

    const [name, setName] = useState(reduxName);
    const [artist, setArtist] = useState(reduxArtist);
    const [album, setAlbum] = useState(reduxAlbum);
    const [lyrics, setLyrics] = useState(reduxLyrics);

    const [file, setFile] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    };

    const handleAlbumChange = (event) => {
        setAlbum(event.target.value);
    };

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        const reader = new FileReader();
        const url = reader.readAsDataURL(event.target.files[0]);
        console.log(url);
        console.log(reader.result);
        setFile('');
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
                        resize="none"
                        defaultValue={lyrics}
                    ></Textarea>
                    <Flex justify="left" margin="10px">
                        <Button
                            onClick={() => {
                                history.push('/edit-lyrics');
                            }}
                        >
                            Edit lyrics!
                        </Button>
                    </Flex>
                </FormControl>
                {file.length >= 1 ? (
                    <Image boxSize="100px" objectFit="cover" src={file[0]} />
                ) : undefined}
                <Flex justify="right">
                    <Button>Confirm changes!</Button>
                </Flex>
            </Stack>
        </>
    );
};

export default SongEditor;
