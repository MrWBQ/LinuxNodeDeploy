// index.js
console.log('Hello, World! Node is working...');

// set variable to reffer to the express package
// instatitage it in a nother variable called app
const express = require('express');
const app = express();
var http = require('http');
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}
// global controller
app.get('/*',function(req,res,next){
  res.removeHeader("X-Powered-By");
  res.header("ETag",false);
  res.header('X-XSS-Protection' , 0 );
  res.header('Strict-Transport-Security',"max-age=31536000");
  res.header('X-XSS-Protection',1);
  res.header('X-Content-Type-Options',"nosniff");
  res.header('X-Frame-Options',"sameorigin");
  res.header('Cache-Control',"private,max-age=31536000");
  res.header('Content-Security-Policy',"default-src 'self' 'unsafe-eval' 'unsafe-inline' *.accenture.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' *.accenture.com data:; connect-src 'self' *.accenture.com");
  res.header('Referrer-Policy',"no-referrer");
  res.header('Feature-Policy','none');
  next(); // http://expressjs.com/guide.html#passing-route control
});

app.get('/', (req, res) => { // new
    res.send('Homepage! Hello world.');
  });

  
app.get('/About', (req, res) => { // new
    res.send('About! Hello world about.');
  });

app.get('/Test', (req, res) => { // new
  res.setHeader('Content-Type', 'application/json');
  res.send(fullUrl(req))
  //res.end(JSON.stringify({ a: 1 }));
});




app.listen(8080, () => console.log('listening on port 3000')); // news
