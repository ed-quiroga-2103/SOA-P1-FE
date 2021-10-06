const createLRCData = (times: string[], lyrics: string[]) => {
    const lines = [];

    for (let i = 0; i < times.length; i++) {
        const line = times[i] + lyrics[i];
        lines.push(line);
    }

    return lines.join('\n');
};

export default createLRCData;
