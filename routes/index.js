var express = require('express');
var router = express.Router();

const axios = require('axios');

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
  res.render('products', { title: 'Portfolio' });
});

/* GET Services page. */
router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET About Us page. */
router.get('/about', function (req, res, next) {
  res.render('about-us', { title: 'About' });
});

/* GET Contact Us page. */
router.get('/contact', function (req, res, next) {
  res.render('contact-us', { title: 'Contact' });
});

/* GET Business Contact List page. */
router.get('/business-contact-list', function (req, res, next) {
  // get request to /api/contacts
  axios.get('http://localhost:3000/api/contacts')
    .then(function (response) {
      res.render('business-contacts', { title: 'Business Contact List', contacts: response.data });
    })
    .catch(err => {
      res.send(err)
    });
});

/* add user. */
router.get('/add-contact', function (req, res, next) {
  res.render('add-contact', { title: 'Add Contact' });
});

/* update user. */
router.get('/update-contact', function (req, res, next) {
  axios.get('http://localhost:3000/api/contacts', { params: { id: req.query.id } })
    .then(function (userData) {
      res.render('update-contact', { contact: userData.data, title: 'Update Contact' })
    })
    .catch(err => {
      res.send(err)
    })
});

module.exports = router;
