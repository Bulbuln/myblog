const express = require('express');
const {  signup_post, signup_get, login_post, signout, login_get } = require('../controlers/auth');
const routes = express.Router();


routes.get('/signup', signup_get);
routes.post('/signup', signup_post);
routes.post('/login', login_post);
routes.get('/login', login_get);
routes.get('/logout', signout );



module.exports = routes