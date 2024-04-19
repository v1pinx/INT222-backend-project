const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');

async function userSignup(req, res) {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        
        return res.render('signup', {
            msg: "User already exists",
        }); 
    }

    const newUser = await User.create({
        username: username,
        password: password,
    });
    return res.redirect('/');
}


async function userLogin(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({username, password});
    if(!user){
        return res.redirect('/login?error=404');
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