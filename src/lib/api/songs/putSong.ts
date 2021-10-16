import axios from 'axios';
import config from '../../../config';

const putSong = async (body: {
    name: string;
    artist: string;
    album: string;
    lyrics: string;
    _id: string;
}, file: any) => {
    console.log(body._id);
    const response = await axios
        .put(`${config.API_URL}/songs/${body._id}`, body)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        }) as any;
    console.log(response);

    if(file.name){

        const data = new FormData();
        data.append('song',file);
        console.log("Updating the bucket", response.data._id)
        data.append('id',response.data._id);
        const configu = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        console.log(data)
        const upload = await axios
        .post(`${config.API_URL}/song`,data,configu)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        })
    }
};

export default putSong;
