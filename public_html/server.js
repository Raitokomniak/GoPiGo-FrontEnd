var express = require('express');
var app = require('express')();
var server = require('http').Server(app);

let mongo = require('mongodb')
let monk = require('monk')
let db = monk('test:test123@ds121289.mlab.com:21289/gopigoboys')

app.set('view engine', 'pug')

app.get('/', function(req, res){
 // res.sendFile(__dirname + '/index.html');
  res.render('index');
  

});

app.use(express.static('public'))
app.use(express.static(__dirname + '/node_modules'));


app.get('/testdb', (req, res) => {
    let database = db.get('gopigodata');
  database.find({}, {
    sort: {
      $natural: -1
    },
    limit: 1
  }, (err, docs) => {
    if (err) {
      res.status(err)
    } else {
      let data = JSON.stringify(docs)
      res.send(data)
      
    }
  })
})

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})