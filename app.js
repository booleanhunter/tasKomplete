/**
 * @author booleanhunter
 * @about Runs the web-server and configures APIs
 */

var http = require('http');  //1
//var https = require('https');
//var fs = require('fs');

var async = require('async'); //2
var express = require('express'); //3
var expressConfigs = require('./configs/server-configs/express-configs');
var configMongodb = require('./configs/db-configs/config-mongodb');

var expressInstance = expressConfigs.configure(),
	debug = require('debug')('taskomplete:app'),
	serverPort = 4321;

http.createServer(expressInstance).listen(serverPort, function () {  //4
    debug('Taskomplete Server running on ' + serverPort);
    
	async.parallel(
		[
			function(callback){
				configMongodb.configure(callback);
			}
		], function(err, results){
			if(err){
				debug(err);
			}else{
				debug(results);
				var routes = require('./controllers/routes');
				routes.initialize(expressInstance);
			}					
		}
	);
});

// https.createServer(credentials, expressInstance).listen(config.development.server_port1, function () {
//     debug('Toorq Server running on ' + config.development.server_port1);
    
//     async.parallel(
//     	[
//     		function(callback){
//     			configCassandra.configure(callback);
    			
//     		},
//     		function(callback){
//     			configRedis.configure(callback);
//     		},
//     		function(callback){
//     			configMongodb.configure(callback);
//     		}
//     	], function(err, results){
// 			if(err){
// 				debug(err);
// 			}else{
// 				debug(results);
// 				requirejs(['controllers/routes'],function(routes){
// 					routes.initialize(expressInstance); //dB
// 				});
// 			}		    		
//     	}
//     );
// });


// //For redirecting from http to https
// var redirectApp = express();
// redirectServer = http.createServer(redirectApp).listen(80, function(){
// 	redirectApp.use(function (req, res, next) {
// 		if (!req.secure) {
// 			return res.redirect('https://' + req.headers.host + req.url);
// 		}
// 		next();
// 	});
// });  
// 	}
// );

/*
1. Load the http module to create an http server.
2. Async is used while dealing with multiple callbacks, helps avoid callback hell and sphagetti code
3. Web framework for Node with utilities for RESTful web services
4. Starts a Web server on the specified port 
*/