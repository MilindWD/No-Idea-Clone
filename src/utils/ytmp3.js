
const ytdl = require('ytdl-core');


const getMP3URL = async (id) => {
    let info = await ytdl.getInfo(id);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    return audioFormats[0].url
}


module.exports = getMP3URL;
