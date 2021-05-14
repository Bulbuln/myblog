const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    let errors = {username: "", name:"", email: "", password: ""};
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }

    if (err.message === 'incorrect password') {
        errors.email = 'that password is incorrect'
    }
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message 
        })
    }

    if (err.code === 11000) {
        errors.email = "that email is already registered";
        errors.username = "that username is already taken";


    }
    return errors

} 

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};
exports.signup_get =  (req, res)=> {
    res.render('signup');
    
}

exports.signup_post = async (req, res)=> {

    const {username, name, email, password} = req.body

    try { 
        const user = await User.create({ username, name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ token, user: user._id });
    }

    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
    
}

exports.login_post = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

exports.login_get = (req, res) => {
    res.render('login')
}

exports.signout = (req, res) => {
    res.clearCookie("jwt")
    res.redirect("/")
}
