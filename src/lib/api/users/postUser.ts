import axios from 'axios';

const postUser = async () => {
    const url = 'http://localhost:6660';

    const body = {
        name: 'eduarod',
        lastname: 'quiroga',
        email: 'rquiroga@gmail.com',
        premium: true,
    };

    const response = await axios.post(`${url}/users`, body).catch((error) => {
        if (error.response && error.response.status === 409) {
            return;
        }
    });

    console.log(response);
};

export default postUser;
