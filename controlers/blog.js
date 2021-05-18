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

exports.create_get = (req, res) =>  {
    res.render('create')
}

exports.blog_details = (req, res) => {
  let id = req.params.id
  Blog.findById(id)
    .then (result => {
      
        res.render('details', {blog: result})
    })
}

exports.blog_delete = (req, res) => {
  let id = req.params.id
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}