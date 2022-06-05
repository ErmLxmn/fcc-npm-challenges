// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//global variables



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:data", function (req, res){
  let data = req.params.data;

  if(!isNaN(Date.parse(data))){
  let unix, utc;
  let response = {};

  if(data.includes("-")){
    unix = new Date(data).getTime();
    utc = new Date(data).toUTCString();
  }else{
    unix = parseInt(data);
    utc = new Date(unix).toUTCString();
  }

  response = {unix , utc};

  if(!response.unix || !response.utc)
      return res.json({error : "Invalid Date"})

  return res.json(response)
  }
return res.json({error : "Invalid Date"})
})

app.get("/api/" , function (req, res){
  let unix = new Date().getTime(),
      utc = new Date().toUTCString(),
      response = {unix , utc};

  return res.json(response)
  
})





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
