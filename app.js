const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname,"public","dist")));

app.use('/api', apiRouter);

app.get("*",(req, res)=>{
    res.sendFile(path.resolve(__dirname,"public","dist","index.html"));
})



app.listen(process.env.PORT || 8000,"0.0.0.0");