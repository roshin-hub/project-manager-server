const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

var port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});