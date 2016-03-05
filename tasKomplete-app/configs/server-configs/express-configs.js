var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//require('method-override') require('server-favicon')
function configure(){
	
	var MongoStore = require('connect-mongo')(expressSession),
		_ = require('underscore'),
        consolidate = require('consolidate');

	var expressInstance = express();
	//Set directory for express to load static files like css
	expressInstance.use(express.static('./public'));
	
	//Set the view engine and view directory path for express
    expressInstance.set('views', 'views');            
    expressInstance.set('view engine', 'html');           
    expressInstance.engine('html', consolidate.underscore);

	expressInstance.use(bodyParser({limit: '50mb'}));
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

    expressInstance.use(expressSession({
     	store: new MongoStore({
	        db: 'todoAppDB',
      	}),
      	secret: 'Ashwin',
      	saveUninitialized: true,
      	resave: true

    }));	

    expressInstance.disable('x-powered-by');	    

    // expressInstance.use(function(req, res, next) {
 //    //To block request for html without being authenticated
 //    	console.log(req.user);
    //     if (req.user) {
    //         console.log("request Authenticated");
    //         express.static("./private")(req,res,next);
    //     } else {
    //         console.log("Request not authenticated");
    //         next();
    //     }
	// });
	
	return expressInstance;
}
exports.configure = configure;