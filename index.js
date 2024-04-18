const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const { connectDB } = require('./db');
const { loggedInUserOnly , checkAuth } = require('./middlewares/auth');
const PORT = process.env.PORT;

const URL = require('./models/urlModel');
const app = express(); 

const urlRoute = require('./routes/urlRoute');
const staticRoute = require('./routes/staticRoutes');
const userRoute = require('./routes/user');


connectDB(process.env.MONGODB_URI)
.then(() => {console.log("DB connected");})
.catch((err) => {console.log(err);})

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', checkAuth, staticRoute);
app.use('/url', loggedInUserOnly , urlRoute);
app.use('/user', userRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp : Date.now()
,            },
        }
    });
    if(!entry){
        return res.status(404).send('Not found');
    }
    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});