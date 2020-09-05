//importing
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const yts = require( 'yt-search' );
const YD = require('./utils/ytmp3');
const downloadsFolder = require('downloads-folder');

const app = express();
const port = process.env.PORT||3000;

//paths for configs
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');

//Setup HandleBars engine and Views location
app.set('view engine','hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialDir);

//Setup static directory
app.use(express.static(publicDir));

//Routes
app.get('', (req,res) => {
    if(req.query.search){
        yts( {query: req.query.search}, function ( err, r ) {
            // if (err){
            //     return res.send({error: err});
            // }
            res.send({
                id: r.all[0].videoId,
                title: r.all[0].title,
                thumbnail: r.all[0].thumbnail,
                time: r.all[0].duration.seconds
            });
        });
        return;
    }
    if(req.query.download){
        YD.download(req.query.download);
        YD.on("finished", function(err, data) {
            res.send(JSON.stringify(data));
        });
        // res.send(downloadsFolder());
    }
});

//Listen
app.listen(port, ()=>{
    console.log('start on '+port);
});