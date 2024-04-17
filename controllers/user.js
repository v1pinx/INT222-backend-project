const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser, getUser } = require('../service/auth');

async function userSignup(req, res) {
    const { username, password } = req.body;
    const x = await User.create({
        username: username,
        password: password, 
    });
    console.log(x);
    return res.redirect('/');
}

async function userLogin(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({username, password});
    if(!user){
        return res.render('login', {
            error: "Invalid username or password",
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    res.cookie('username', user.username);
    return res.redirect('/')
}

module.exports = {
    userSignup,
    userLogin,
}