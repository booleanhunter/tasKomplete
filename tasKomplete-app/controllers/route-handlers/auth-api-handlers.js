define(
    [
        'async',
        '../../database/auth-db-api'
    ], 
    function (async, authDbApi) {
    	var debug = require('debug')('todoapp:auth-api-handlers');

        function login(req, responseCallback){
            async.series(
                [
                    function(callback){
                        authDbApi.checkForUser(req.body, callback);
                    }
                ],
                function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var resultData = {};
                        if(results.length > 0){
                            if(results[0].password === req.body.password){
                                resultData = {
                                    userName: results[0].userName,
                                    displayName: results[0].displayName
                                }
                            }else{
                                resultData = {
                                    userName: null,
                                    displayName: null
                                }
                            }
                        }else{
                            resultData = {
                                userName: null,
                                displayName: null
                            }
                        }
                        responseCallback(resultData);
                    }
                }
            )
        }

    	function checkForUser(req, responseCallback){
            async.series(
                [
                    function(callback){
                        authDbApi.checkForUser(req.body, callback);
                    }
                ],
                function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var resultData = {};
                        if(results.length > 0){
                            resultData = {
                                userName: results[0].userName,
                                displayName: results[0].displayName
                            }
                            
                        }else{
                            resultData = {
                                userName: null,
                                displayName: null
                            }
                        }
                        responseCallback(resultData);
                    }
                }
            )
    		
    	}

    	function registerNewUser(req, responseCallback){
    		authDbApi.registerNewUser(req.body, responseCallback);
    	}

    	return {
            login: login,
            checkForUser: checkForUser,
            registerNewUser: registerNewUser
    	}
    }
)    