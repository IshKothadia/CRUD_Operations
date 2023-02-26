// auth.js Isha Kothadia 301298827 26/02/2023 

// const router = require('express').Router();
const passport = require('passport');

//user model
const User = require('../model/user');

//create passport local strategy
passport.use(User.createStrategy());

// serialize and deserialize user
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user)
//     });
// });

// login user
exports.login = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!req.user) {
                    return res.redirect('/login');
                }
                req.logIn(req.user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/business-contact-list');
                });
            })(req, res, next);
        }
    });
};

// // logout user
// router.get("/auth/logout", (req, res) => {
//     //use passport logout method
//     req.logout();
//     res.redirect("/");
// });

exports.logout = (req, res, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

// module.exports = router;