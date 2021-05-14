const express = require('express');
const { blog_post, blog_get, blogs,  } = require('../controlers/blog');
const { requireAuth } = require('../middleware/authMiddleware');
const routes = express.Router();


routes.get('/', blogs)
routes.post('/', blog_post)
routes.get('/create-blog', requireAuth, blog_get );

module.exports = routes