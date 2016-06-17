/*
 * @author booleanhunter
 * @about Configures Express and returns it
 */

var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var bodyParser = require('body-parser'); //1
var cookieParser = require('cookie-parser');
// require('server-favicon')

function configure(){
	
	var RedisStore = require('connect-redis')(expressSession)
		_ = require('underscore'),
        consolidate = require('consolidate'); //2

	var expressInstance = express(); //3

	//Set directory for express to load static files like css
	expressInstance.use(express.static('./public'));
	
	//Set the view engine and view directory path for express
    expressInstance.set('views', 'views');            
    expressInstance.set('view engine', 'html');           
    expressInstance.engine('html', consolidate.underscore); 

	expressInstance.use(bodyParser.json());
    expressInstance.use(cookieParser());
    /*
    If you're using urlencoded with { extended:false }, req.body will return the unparsed raw string from the form categoryName=test.
    Meaning req.body.categoryName will be undefined.

    Try passing true so it can parse the form data using the qs module.
    */
    
    expressInstance.use(bodyParser.urlencoded({
        extended: true,
    }));

    expressInstance.use(expressSession({ //4
        store: new RedisStore({
            host: 'localhost',
            port: 6379,
            db: 2,
            ttl: 60 * 60 * 24 * 365
        }),
        secret: 'booleanhunter',
        resave: true,
        saveUninitialized: true
    }));

    expressInstance.disable('x-powered-by'); //5  

 //    expressInstance.use(function(req, res, next) {
 //    	res.header("X-powered-by", "The Spirit Bomb")
 //        next()
	// });
	
	return expressInstance;
}
exports.configure = configure;


/*
1. To parse JSON from request body
2. Template engine consolidation library.
3. Creates an instance of the express object.
4. USing Redis store for saving sessions
5. To remove the x-powered-by from request headers
*/