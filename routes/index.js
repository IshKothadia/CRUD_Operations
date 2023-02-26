// index.js Isha Kothadia 301298827 26/02/2023 

var express = require('express');
var router = express.Router();

const axios = require('axios');

var controller = require('../server/controller/controller');
var authRoute = require('../server/controller/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET Products page. */
router.get('/products', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('products', { title: 'Portfolio' });
  } else {
    res.render('login', { title: 'Login' });
  }
});

/* GET Services page. */
router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET About Us page. */
router.get('/about', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('about-us', { title: 'About' });
  } else {
    res.render('login', { title: 'Login' });
  }
});

/* GET Contact Us page. */
router.get('/contact', function (req, res, next) {
  res.render('contact-us', { title: 'Contact' });
});

/* GET Business Contact List page. */
router.get('/business-contact-list', function (req, res, next) {
  // get request to /api/contacts
  if (req.isAuthenticated()) {
    // https://portfoliowebsite-ishakothadia.onrender.com/api/contacts
    // http://localhost:3000/api/contacts
    
    axios.get('https://portfoliowebsite-ishakothadia-contactlist.onrender.com/api/contacts')
      .then(function (response) {
        res.render('business-contacts', { title: 'Business Contact List', contacts: response.data });
      })
      .catch(err => {
        res.send(err)
      });
  } else {
    res.render('login', { title: 'Login' });
  }
});

/* add user. */
router.get('/add-contact', function (req, res, next) {
  res.render('add-contact', { title: 'Add Contact' });
});

/* update user. */
router.get('/update-contact', function (req, res, next) {
  // https://portfoliowebsite-ishakothadia.onrender.com/api/contacts
// http://localhost:3000/api/contacts

  axios.get('https://portfoliowebsite-ishakothadia-contactlist.onrender.com/api/contacts', { params: { id: req.query.id } })
    .then(function (userData) {
      res.render('update-contact', { contact: userData.data, title: 'Update Contact' })
    })
    .catch(err => {
      res.send(err)
    })
});

/* GET Login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

// router.post('/login', function(req, res){
//   authRoute.login
// });

// router.post('/logout', function(req, res){
//   authRoute.logout
// });

router.post('/login', authRoute.login);
router.get('/logout', authRoute.logout);

module.exports = router;
