//importing
const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
    res.render('index',{
        message: "workflow"
    });
});

//Listen
app.listen(port, ()=>{
    console.log('start on '+port);
});