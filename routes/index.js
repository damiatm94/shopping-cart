const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');
const csrfProtection = csrf();

const Product = require('../models/product');
router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("Working on home page");
    // const someArray = [1,2,3,4];
    // res.render('shop/index', {title: 'Shopping Cart', products: someArray});

    Product.find(function (err, callback) {
        res.render('shop/index', {title: 'Shopping Cart', products: callback}); // does not working !!!! Powtorz odcinek 5
    });

});

router.get('/user/signup', function (req, res, next) {
    console.log("Working on path user/signup");

    const messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    // does not working, check why redirects to users/users/signup
    // instead of users/profile (odc.7, 20.00)
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true // flash a message to true
}));

router.get('/user/profile', function(req, res, next) {
    res.render('user/profile');
});

router.get('/user/signin', function(req, res, next) {
    const messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('user/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true // flash a message to true
}));

module.exports = router;
