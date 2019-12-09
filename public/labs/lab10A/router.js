const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes/add', (req, res) => {

    res.render('../public/labs/lab10/view', {
        title: 'Lab 10',
        data: {} // No data 
    });

});

router.get('/quotes/login', (req, res) => {
    
    res.render('../public/labs/lab10/login', 
    {
        Title: 'Login: Welcome'
    });
});

router.post('/quotes/add', function(req, res, next) {

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
