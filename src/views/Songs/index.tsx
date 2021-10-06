import { Button } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import SongList from '../../components/SongList/SongList';
interface SongsProps {}

const Songs: FunctionComponent<SongsProps> = () => {
    const history = useHistory();
    return (
        <>
            <SongList songs={[]}> </SongList>
        </>
    );
};

export default Songs;
