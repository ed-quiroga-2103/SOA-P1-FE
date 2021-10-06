import { FunctionComponent } from 'react';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import SongList from '../../components/SongList/SongList';
import auth from '../../lib/auth';
interface SongsProps {}

const Songs: FunctionComponent<SongsProps> = () => {
    const history = useHistory();

    const mochi = new Cookies().get('mochi');
    if (!mochi) {
        history.push('/login');
    } else if (auth.isTokenExpired(mochi.accessToken)) {
        new Cookies().remove('mochi');
        history.push('/login');
    }
    return (
        <>
            <SongList songs={[]}> </SongList>
        </>
    );
};

export default Songs;
