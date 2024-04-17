const express = require('express');
const URL = require('../models/urlModel');

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const username = req.cookies.username;
    const allUrls = await URL.find({ createdBy: req.user._id })
    console.log(allUrls)
    return res.render('home', {
        urls: allUrls,
        username: username,
    });
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.get('/login', (req, res) => {
    return res.render('login');
})


router.post('/delete', async(req, res) => {
    const shortId = req.body.shortId;
    await URL.deleteOne({
        shortId,
    });
    return res.redirect('/');
})

module.exports = router;