const express = require('express');
const bodyParser = require('body-parser');
const project = require('./routes/project.route'); 
const user = require('./routes/user.route'); 
const task = require('./routes/task.route'); 
// initialize our express app
const app = express();



// Set up mongoose connection
const mongoose = require('mongoose');
let db_url = 'mongodb://localhost/project_manager';
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/*var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/project_manager', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));*/


app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET,DELETE, OPTIONS");
   if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
  }
  else {
    //move on
      next();
   } 	 
});
app.use(bodyParser.urlencoded({extended: false}));
app.use('/project', project);
app.use('/user', user);
app.use('/task', task);

var port = 8090;


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});