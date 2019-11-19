const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/* GET users listening. (/mysql) */
router.get('/', function(req, res, next) {
    
    // GET A QUERY STRING VALUE FOR FILTER
    const nameFilter = req.query.name; 

    const connection = mysql.createConnection({
        host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'pqai7eyjjnf44uh5',
        password: 'tg0cclip6o8u6n6b',
        database: 'ddwnbsxcdd0glq33'
    });

    connection.connect();

    connection.query(`
    SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
    FROM l9_quotes q INNER JOIN 
    l9_author a ON q.authorId = a.authorId
    `, function(error, results, fields) {
        if (error) throw error;

        res.render('../public/labs/lab9/view', {
            title: 'Lab 9', 
            quotes: results
        });
    });

    connection.end();
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');

// /* GET users listening. (/mysql) */
// router.get('/quotes', function(req, res, next) {
    
//     // GET A QUERY STRING VALUE FOR FILTER
//     const nameFilter = req.query.name; 

//     const connection = mysql.createConnection({
//         host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//         user: 'pqai7eyjjnf44uh5',
//         password: 'tg0cclip6o8u6n6b',
//         database: 'ddwnbsxcdd0glq33'
//     });

//     connection.connect();

//     connection.query(`
//     SELECT DISTINCT CONCAT(a.firstName, ' ', a.lastName) AS 'authorName'
//     FROM l9_favorite f INNER JOIN
//     l9_quotes q ON f.quoteId = q.quoteId INNER JOIN
//     l9_author a ON q.authorId = a.authorId  
//     `, function(error, results, fields) {
//         if (error) throw error;

//         res.render('../public/labs/lab9/view', {
//             title: 'Lab 9', 
//             quotes: results
            
//         });
//     });

//     connection.end();
// });

// module.exports = router;