const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const blogRoutes = require("./routes/blog")
const authRoutes = require("./routes/auth");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
require('dotenv').config();

app.set('view engine', 'ejs')

const port = process.env.PORT || 8000;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(port))
  .catch((err) => console.log(err));


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

// cors 

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

  //routes middleware
  app.use('*', checkUser)
  app.use( '/blogs', blogRoutes)
  app.use(authRoutes)

  app.get('/', (req, res) => {
    res.redirect('/blogs')
})




// port



