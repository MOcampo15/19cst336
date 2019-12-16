const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/home', function(req, res, next) {

    const selectAllSql = `
        SELECT appointment.date, appointment.start_time, appointment.end_time 
        FROM appointment
        `;

    const connection = mysql.createConnection({
        host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'pqai7eyjjnf44uh5',
        password: 'tg0cclip6o8u6n6b',
        database: 'ddwnbsxcdd0glq33'
    });

    connection.connect();

    connection.query(selectAllSql,
        function(error, results, fields) {
            if (error) throw error;
            // console.log('The quotes are: ', results);

            res.render('../public/Exam/Final/views/index', {
                title: 'Scheduler',
                quotes: results
            });
        });

    connection.end();

});

router.get('/home/edit', (req, res) => {

    // If this is an edit instead of an add (maybe change the route name from add to edit)
    // you would check to see if a query string value was passed in, then fetch the data from MySQL if it is

    if (req.query.id) {

        const connection = mysql.createConnection({
            host:'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user:'pqai7eyjjnf44uh5',
            password:'tg0cclip6o8u6n6b',
            database:'ddwnbsxcdd0glq33'
        });

        const selectOneSql = `
        SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
        FROM l9_quotes q INNER JOIN
        l9_author a ON q.authorId = a.authorId
        WHERE q.quoteId = ?
`;
        // Get the data for the ID from the database, then pass into the view with the data
        connection.connect();

        connection.query(selectOneSql, [req.query.id],
            function(error, results, fields) {

                if (error) throw error;

                res.render('../public/Exam/Final/views/edit', {
                    title: 'Final Exam: Scheduler', 
                    data: results[0]
                });
            });

        connection.end();
    }
    else {
        // No query string for a quote to edit so must be new
        res.render('../edit', {
            title: 'Scheduler: Add Appointment',
            data: {} // No data
        });
    }

});

router.post('/home/edit', function(req, res, next) {

    const connection = mysql.createConnection({
        host:'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:'pqai7eyjjnf44uh5',
        password:'tg0cclip6o8u6n6b',
        database:'ddwnbsxcdd0glq33'
    });

    connection.connect();

    if (req.body.quoteId && req.body.quoteId.length > 0) {
        connection.query(
            'UPDATE appointment SET date = ?, start_time = ?, end_time = ? WHERE new_appt = ?', [req.body.date, req.body.start_time, req.body.end_time, req.body.new_appt], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.new_appt
                });
            });
    }
    else {
        connection.query(
            'INSERT INTO appointment(date, start_time,end_time) VALUES (?, ?, ?)', [req.body.date, req.body.start_time, req.body.end_time], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.new_appt
                });
            });
    }

    connection.end();

});

module.exports = router;
// router.get('/quotes/delete', (req, res, next) => {

//     if (!req.query.id || req.query.id.length === 0) {
//         return next(new Error("There is a problem"));
//     }
//     const connection = mysql.createConnection({
//         host:'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//         user:'pqai7eyjjnf44uh5',
//         password:'tg0cclip6o8u6n6b',
//         database:'ddwnbsxcdd0glq33'
//     });

//     const selectOneSql = `
// SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
// FROM l9_quotes q INNER JOIN
// l9_author a ON q.authorId = a.authorId
// WHERE q.quoteId = ?
// `;
//     // Get the data for the ID from the database, then pass into the view with the data
//     connection.connect();

//     connection.query(selectOneSql, [req.query.id],
//         function(error, results, fields) {

//             //console.log('results', results[0]);

//             if (error) throw error;

//             res.render('../public/labs/lab10/views/delete', {
//                 title: 'Lab 10 Delete Quote',
//                 data: results[0]
//             });
//         });

//     connection.end();

// });

// router.delete('/quotes/delete', function(req, res, next) {

//     if (!req.body.quoteId || req.body.quoteId.length === 0) {
//         return next(new Error("There is a problem"));
//     }
    
//     // Add check to see if there are any favorites, and if there are, send
//     // back an error message and DO NOT attempt a DELETE

//     const connection = mysql.createConnection({
//         host:'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//         user:'pqai7eyjjnf44uh5',
//         password:'tg0cclip6o8u6n6b',
//         database:'ddwnbsxcdd0glq33'
//     });

//     connection.connect();

//     connection.query(
//         'DELETE FROM l9_quotes WHERE quoteId = ?', [req.body.quoteId], // assuming POST
//         (error, results, fields) => {
//             if (error) throw error;
//             res.json({
//                 id: results.quoteId
//             });
//         });

//     connection.end();

// });


// const express = require("express");
// const path = require('path');
// const mysql = require('mysql');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const app = express();

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.set('view engine', 'hbs');
// app.engine('html', require('ejs').renderFile);
// app.use(express.static("public"));

// app.get('/', function(req, res, next) {
//     res.render("index.hbs");
// });

// app.post('/', function(req, res, next) {
//     const connection = mysql.createConnection({
//         host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//         user: 'pqai7eyjjnf44uh5',
//         password: 'tg0cclip6o8u6n6b',
//         database: 'ddwnbsxcdd0glq33'
//     });
    
// app.get('/index', function(req, res) {
//     const connection = mysql.createConnection({
//         host: 'mcldisu5ppkm29wf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//         user: 'zzrbbsj5791xsnwf',
//         password: 'l4kg72cf660m8hya',
//         database: 'l2gh8fug1cqr96dc'
//     });
    
//     connection.connect();
    
//     // TO DISPLAY USER'S CURRENT APPOINTMENTS
//     connection.query(
//         `SELECT appointment.date, appointment.start_time, appointment.end_time
//         FROM appointment`, function (req, res, next)
//         {
//             res.render('index.hbs', {
//                 date: results
//             });
//         })
        // connection.query(
        // `SELECT appointment.date, appointment.start_time, appointment.end_time 
        // FROM appointment,` function (error, results, fields) {
        //     if (error) throw error;
            
        //     connection.query( 
        //     `SELECT date, start_time FROM appointment
        //     ORDER BY date`, function (error, results2, fields) {
        //         if (error) throw error;
        //         connection.end();
            
        //         res.render('index.hbs', {
        //             date: results, 
        //         });
        //     }); 
    //} else {
    //     delete req.session.username;
    //     res.redirect('/');
    // }

// module.exports = router;
