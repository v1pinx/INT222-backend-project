const express = require('express');
const { generateUrl , getAnalytics } = require('../controllers/generateUrl');
const router = express.Router();

router.post("/", generateUrl);

router.get('/analytics/:shortId', getAnalytics);

module.exports = router;