const express = require('express');
const app = express();
const port = 8000;
const habit = require('./models/user');
const db = require('./config/mongoose');


app.use(express.urlencoded());

//use express router
app.use('/',require('./routes'));

//setting ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//creating the server
app.listen(port, function(err){
    if(err){
        console.log(`error in running the server: ${err} `);
    }

    console.log(`server is running on : ${port}`);
})