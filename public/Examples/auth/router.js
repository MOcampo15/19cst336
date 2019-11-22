const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

//Get dashboard view 
router.get('/dashboard', (req, res, next) => {

    if (req.session && req.session.username && req.session.username.length) {
        res.render('../public/Examples/auth/dashboard', {
            title: 'Logged In Dashboard'
        });
    } else {
        delete req.session.username;
        res.redirect('/auth/login');
    }
    });


router.get('/login', (req, res, next) => {

    res.render('../public/examples/auth/login', {
        title: 'Login'
    });

});
router.post('/login', function(req, res, next) {

    // Get a query string value for filter
    const nameFilter = req.query.name;

    const connection = mysql.createConnection({
        host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'pqai7eyjjnf44uh5',
        password: 'jtg0cclip6o8u6n6b',
        database: 'ddwnbsxcdd0glq33'
    });

    connection.connect();

    connection.query(
        'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)', 
        [req.body.authorId, req.body.quote, req.body.category], // assuming POST
        (error, results, fields) => {
            if (error) throw error;
            res.json({
                id: results.insertId
            });
        });
        
    connection.query(
        )

    connection.end();

});

module.exports = router;
