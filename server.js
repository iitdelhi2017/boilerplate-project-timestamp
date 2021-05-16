// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// --------------------------------------------------------------------------

var curr_time=function(req,res){
  //console.log(req.params);
  //console.log(req.query);
  if(req.params.date==undefined){
    res.json({"unix":Date.parse(new Date()),"utc":(new Date()).toUTCString()});
  }
  else if(isNaN(req.params.date) && isNaN(Date.parse(req.params.date))){
    res.json({"error":"Invalid Date"});
  }
  else{
    if(isNaN(req.params.date))
      res.json({"unix":Date.parse(new Date(req.params.date)),"utc":(new Date(req.params.date)).toUTCString()});

    else res.json({"unix":parseInt(req.params.date),"utc":(new Date(parseInt(req.params.date))).toUTCString()});
  };
};

app.get('/api/:date?',curr_time);

//-------------------------------------------------------------------------

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
