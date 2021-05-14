const { json } = require('body-parser')
const Blog = require('../models/blog')

exports.blogs = (req, res) =>  {
    Blog.find()
    .then (result => {
        res.render('index', {blogs: result})
    })

}

exports.blog_post = (req, res)=> {
    const blog = new Blog(req.body);
    console.log(req.body)
    blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.blog_get = (req, res) =>  {
    res.render('create')
}