const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/* GET users listening. (/mysql) */
router.get('/quotes', function(req, res, next) {
    
    // GET A QUERY STRING VALUE FOR FILTER
    const nameFilter = req.query.name; 

    const connection = mysql.createConnection({
        host: 'jlg7sfncbhyvga14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'kgsp8cuninnyenel',
        password: 'yxg1f7icahzihvun',
        database: 'oheaxh89o3hnyvdk'
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