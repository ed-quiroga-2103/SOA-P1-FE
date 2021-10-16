const handleLRCData = (data) => {
    const lines = data.split(/\r\n|\r|\n/);
    const timesList = [];
    const lyricsList = [];
    const otherTimesList = [];

    for (const line of lines) {
        const values = line.split(']');

        const time = values[0] + ']';
        otherTimesList.push(time)
        const lyrics = values[1];

        const formattedTime = time.replace('[', '').replace(']', '');

        const times = formattedTime.split(':');

        const seconds =
            Number(times[0]) * 3600 + Number(times[1]) * 60 + Number(times[2]);

        timesList.push(seconds);
        lyricsList.push(lyrics);
    }

    timesList.pop();
    //lyricsList.pop();

    return { times: timesList, lyrics: lyricsList, timeStamps:otherTimesList };
};

export default handleLRCData;
