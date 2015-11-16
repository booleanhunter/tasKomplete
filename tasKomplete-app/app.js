var requirejs = require('requirejs');
requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(
	[
		'http',
		'https',
		'async',
		'fs',
		'express',
		'configs/server-configs/express-configs',
		'configs/db-configs/config-mongodb'
	],
	function(http, https, async, fs, express, expressConfigs, configMongodb){
		var expressInstance = expressConfigs.configure(),
			debug = require('debug')('todoapp:app'),
			serverPort = 9992;

		http.createServer(expressInstance).listen(serverPort, function () {
		    debug('TodoApp Server running on ' + serverPort);
		    
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
						requirejs(['controllers/routes'],function(routes){
							routes.initialize(expressInstance); //dB
						});
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
	}
);

/*  
snazzy-todo
snappy-todo
todo-docker
todockyard
todo++
todo-tracker
todopedia
swanky-todo
classy-todo
taskomplete
*/