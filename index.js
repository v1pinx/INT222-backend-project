const express = require('express');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db');
const { loggedInUserOnly , checkAuth } = require('./middlewares/auth');

const URL = require('./models/urlModel');
const app = express(); 
const PORT = 8001;

const urlRoute = require('./routes/urlRoute');
const staticRoute = require('./routes/staticRoutes');
const userRoute = require('./routes/user');

connectDB("mongodb://localhost:27017/shrinker2")
.then(() => {console.log("DB connected");})
.catch((err) => {console.log(err);})

app.set('view engine', 'ejs');

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