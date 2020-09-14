//importing
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const yts = require( 'yt-search' );
const getMP3URL = require('./utils/ytmp3');

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
app.get('/search/:q', (req,res) => {
    if(req.params.q){
        yts( {query: req.params.q}, function ( err, r ) {
            res.send({
                id: r.all[0].videoId,
                title: r.all[0].title,
                thumbnail: r.all[0].thumbnail,
                time: r.all[0].duration.seconds
            });
        });
    }
});

app.get('/download/:id', async (req, res) => {
    res.send({
        url: await getMP3URL(req.params.id)
    });
});


//Listen
app.listen(port, ()=>{
    console.log('start on '+port);
});