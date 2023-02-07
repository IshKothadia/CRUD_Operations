var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET Products page. */
router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Portfolio' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
  res.render('about-us', { title: 'About' });
});

/* GET Contact Us page. */
router.get('/contact', function(req, res, next) {
  res.render('contact-us', { title: 'Contact' });
});

module.exports = router;
