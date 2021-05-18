const { Router } = require('express');
const express = require('express');
const { blog_post, create_get, blogs, blog_details, blog_delete,  } = require('../controlers/blog');
const { requireAuth } = require('../middleware/authMiddleware');
const routes = express.Router();


routes.get('/', blogs)
routes.post('/', blog_post)
routes.get('/create-blog', requireAuth, create_get );
routes.get('/:id', requireAuth, blog_details)
routes.delete('/:id', blog_delete)

module.exports = routes