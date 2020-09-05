const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");

const mp3Path = path.join(__dirname, '../../mp3');

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": ffmpeg.path,        
    "outputPath": mp3Path,    
    "youtubeVideoQuality": "highestaudio",  
    "queueParallelism": 2,                  
    "progressTimeout": 2000,               
    "allowWebm": false                      
});

module.exports = YD;