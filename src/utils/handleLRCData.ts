const handleLRCData = (data) => {
    const lines = data.split(/\r\n|\r|\n/);
    const timesList = [];
    const lyricsList = [];

    for (const line of lines) {
        const values = line.split(']');

        const time = values[0] + ']';
        const lyrics = values[1];

        timesList.push(time);
        lyricsList.push(lyrics);
    }

    return { times: timesList, lyrics: lyricsList };
};

export default handleLRCData;
