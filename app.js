const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./db');

const app = express();

const adminRoutes = require('./API/routes/admin');
const receivedRoutes = require('./API/routes/received');
const washedRoutes = require('./API/routes/washed');

//morgan package to handle all routes
app.use(morgan('dev'));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Handling CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Acess-Controll-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/admin', adminRoutes);
app.use('/received', receivedRoutes);
app.use('/washed', washedRoutes);




//Error handling functions
app.use((req, res, next) => {
    const error = new Error('Not  found');
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;