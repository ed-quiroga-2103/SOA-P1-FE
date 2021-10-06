import { FC } from 'react';
import {
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Text,
    Textarea,
    Tooltip,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';

interface ErrorWithToolTipProps {
    error: string;
    tip: string;
}

const ErrorWithToolTip: FC<ErrorWithToolTipProps> = ({ error, tip }) => {
    return (
        <>
            <Flex justify="right" alignContent="center" alignItems="center">
                <Text color="red.600" margin="10px">
                    {error}
                </Text>
                <Tooltip label={tip} fontSize="md">
                    <QuestionIcon />
                </Tooltip>
            </Flex>
        </>
    );
};

export default ErrorWithToolTip;
