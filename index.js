const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const route1 = require('./routes/route1');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',route1);

app.listen(process.env.PORT, () => {
    console.log(`Your serve