// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var comments = require('./comments.js');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;

  if (url_parts.pathname === '/comments' && request.method === 'GET') {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(comments.get()));
  } else if (url_parts.pathname === '/comments' && request.method === 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      var comment = JSON.parse(body);
      comments.add(comment);
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(comments.get()));
    });
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("404 Not Found\n");
  }
});

// Listen on port 8000, IP defaults to