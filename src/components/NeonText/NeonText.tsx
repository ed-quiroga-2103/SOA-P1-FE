import { Text } from '@chakra-ui/layout';
import { FunctionComponent } from 'react';

interface NeonTextProps {
    text: string;
    fontSize?: string;
    color?: 'white-on' | 'white-off';
}

const css = `
font-size: 2rem;
display: inline-block
border: purple 1px solid;
color: purple;`;

const NeonText: FunctionComponent<NeonTextProps> = ({
    text,
    fontSize,
    color = 'violet',
}) => {
    return (
        <>
            <Text
                textAlign="center"
                className={`neon-button-${color}`}
                fontSize={fontSize}
            >
                {text}
            </Text>
        </>
    );
};

export default NeonText;
