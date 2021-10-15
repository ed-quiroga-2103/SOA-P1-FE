import { Center, Container, Flex } from '@chakra-ui/layout';
import { FC, useEffect, useRef } from 'react';
import AudioPlayer from '../AudioPlayer/Player';
import { useState } from 'react';

import LyricsScroll from '../LyricsScroll/LyricsScroll';
import { useStyles } from '@chakra-ui/system';
import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getSongId } from '../../redux/song';

interface TestProps {}

const Test: FC<TestProps> = () => {
    return (
        <>
            <Container></Container>
        </>
    );
};

export default Test;
