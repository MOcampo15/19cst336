var express = require('express')
var app = express()

app.use('/', function (req, res, next) {
  res.send('<h1>hello world</h1>')
})


app.listen(3000)