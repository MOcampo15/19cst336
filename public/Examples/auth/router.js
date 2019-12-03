const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session'); 

router.get('/dashboard', function(req, res, next) {
    if (req.session && req.session.username && req.session.username.length) {
        res.render('../public/Examples/auth/dashboard', {
            title: 'Dashboard', 
            username: req.session.username 
        });
    } else {
        delete req.session.username; 
        res.redirect('/auth/login'); 
    }
});

// deliver the view 
router.get('/login', function(req, res, next) {
    res.render('../public/Examples/auth/login', {
        title: 'Login'
    });
});

// not rendering, pass back json 
router.post('/login', function(req, res, next) {
    // Do something to login... 
    let successful = false; 
    let message = ''; 
    
    if (req.body.username === 'hello' && req.body.password === 'world') {
        successful = true; 
        req.session.username = req.body.username; 
    } else {
        // delete user as punishment 
        delete req.session.username; 
        message = 'Wrong username or password!' 
    }
    console.log("success is...", successful); 
    
    // Return success or failure 
    res.json({
        result: successful, 
        message: message 
    });
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');
// const session = require('express-session');

// // GET dashboard view. (/auth/dashboard)
// router.get('/dashboard', function(req, res, next) {
//     console.log('what is the session id?', req.cookies['connect.sid']);
//     // console.log('what is json?', req.cookies['jason']);

//     console.log('session username', req.session.username);

//     if (req.session && req.session.username && req.session.username.length) {
//         res.render('../public/Examples/auth/dashboard', {
//             title: 'Dashboard',
//             username: req.session.username
//         });
//     }
//     else {
//         delete req.session.username;
//         res.redirect('/auth/login');
//     }
// });

// /* GET login view. (/auth/login) */
// router.get('/login', function(req, res, next) {

//     res.render('../public/Examples/auth/login', {
//         title: 'Login'
//     });

// });

// router.get('/logout', function(req, res, next) {

//     if (req.session && req.session.username && req.session.username.length) {
//         delete req.session.username;
//     }

//     res.json({
//         successful: true,
//         message: ''
//     });

// });

// /* POST login credentials to login via JSON. (/auth/login) */
// router.post('/login', function(req, res, next) {

//     // console.log('inside login post');

//     let successful = false;
//     let message = '';
    
//     // TODO: replace with MySQL SELECT and hashing/salting...
//     if (req.body.username === 'hello' && req.body.password === 'world') {
//         successful = true;
//         req.session.username = req.body.username;
//         // req.cookie('jason', 'the great!', { maxAge: 900000, httpOnly: true });
//     }
//     else {
//         // delete the user as punishment!
//         delete req.session.username;
//         message = 'Wrong username or password!'
//     }

//     console.log('session username', req.session.username);

//     // console.log('res.body', req.body);

//     // Return success or failure
//     res.json({
//         successful: successful,
//         message: message
//     });

// });

// module.exports = router;
