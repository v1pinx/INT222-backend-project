const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index.ejs');
})

// router.post('/shrink', createShortURL);


module.exports = router;