import { QuestionIcon } from '@chakra-ui/icons';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

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
