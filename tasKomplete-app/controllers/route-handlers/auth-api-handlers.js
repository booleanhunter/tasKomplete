define(
    [
        'async',
        '../../database/auth-db-api'
    ], 
    function (async, authDbApi) {
    	var debug = require('debug')('todoapp:auth-api-handlers');

    	function renderPage(req, responseCallback){
    		var argOne = 'index',
                argTwo = {};
            if(req.session.user){
                argTwo = {
                    name: req.session.user.userName
                };
                responseCallback(argOne, argTwo);
            }                
            else{
                argTwo = {       
                    name: null
                };
                responseCallback(argOne, argTwo);
            } 
    	}

    	function checkForUser(req, responseCallback){
    		authDbApi.checkForUser(req.body, responseCallback);
    	}

    	function registerNewUser(req, responseCallback){
    		authDbApi.registerNewUser(req.body, responseCallback);
    	}

    	return {
    		renderPage: renderPage,

    	}

    }
)    