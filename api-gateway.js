'use strict';

var http = require('http'),
  url = require('url'),
  qs = require('querystring'),
  context = {
    response:null,
    succeed:function(data){
      this.response.writeHead(200);
      this.response.end(data);
    },
    fail:function(err){
      this.response.writeHead(400);
      this.response.end(err);
    }
  };

var PORT = process.env.PORT || 8181;

function handleRequest(request, response){

  // Setup the lambda payload with the params we are going
  // to expect when passed from API Gateway to Lambda
  var payload = {},
    body = '';

  var parsedUrl = url.parse(request.url);
  payload.query = qs.parse(parsedUrl.query);
  payload.method = request.method;
  payload.path = parsedUrl.pathname;

  request.on('data', function (data) {
    body += data;
  });
  request.on('end', function () {
    payload.body = JSON.parse(body);

    // Load the lambda function
    var lambda = require('./citeServerLambda.js');
    // Set the response on the context object - it will need to respond to the request
    context.response = response;

    // Send the request through the lambda function
    lambda.handler(payload, context);
  });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});