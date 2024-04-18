const shortid = require('shortid');
const URL = require('../models/urlModel');

async function generateUrl(req, res) {
    const body = req.body;
    if(!body.redirectUrl){
        return res.status(400).json({error: 'URL is required'});
    }

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.redirectUrl,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.redirect('/');
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = { 
    generateUrl,
    getAnalytics,
};