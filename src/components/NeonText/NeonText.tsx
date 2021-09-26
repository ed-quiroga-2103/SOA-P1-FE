import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { isLogged, login } from '../../redux/logged';

interface NeonTextProps {
    text: string;
}

const css = `
font-size: 2rem;
display: inline-block
border: purple 1px solid;
color: purple;`;

const NeonText: FunctionComponent<NeonTextProps> = ({ text }) => {
    return (
        <>
            <Text className="neon-button">{text}</Text>
        </>
    );
};

export default NeonText;
