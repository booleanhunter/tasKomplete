/**
 * @author booleanhunter
 * @about Route handling for auth-api
 */

var async = require('async');
var bcrypt = require('bcrypt');
var authDbApi = require('../../database/auth-db-api');
var debug = require('debug')('taskomplete:auth-api-handlers');

function renderPage(req, responseCallback){
    var argOne = 'login',
        argTwo = {};
    if(req.session.user){
        argTwo = {
            user_name: req.session.user.userName,
            display_name: req.session.user.displayName
        };
        responseCallback(argOne, argTwo);
    }                
    else{
        argTwo = {       
            user_name: null,
            display_name: null
        };
        responseCallback(argOne, argTwo);
    } 
}

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
                if(results[0].userName){
                    bcrypt.compare(req.body.password, results[0].password, function(err, res) {
                        if (err){
                            debug(err);
                        }else{
                            if(res){
                                debug('success')
                                resultData = {
                                    userName: results[0].userName,
                                    displayName: results[0].displayName
                                }
                            }else{
                                debug('failure');
                                resultData = {
                                    userName: null,
                                    displayName: null
                                }
                            }

                            responseCallback(resultData);
                        }
                    });
                }else{
                    resultData = {
                        userName: null,
                        displayName: null
                    }
                    responseCallback(resultData);
                }
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
                    if(results[0].userName){
                        resultData = {
                            status: 'unavailable'
                        }
                        
                    }else{
                        resultData = {
                            status: 'available'
                        }
                    }               
                }else{
                    resultData = {
                        status: 'unavailable'
                    }
                }
                responseCallback(resultData);
            }
        }
    )
	
}

function registerNewUser(req, responseCallback){
    var SALT_WORK_FACTOR = 10,
        reqObj = req.body;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err){
            debug(err);
        }
        // hash the password using our new salt
        bcrypt.hash(reqObj.password, salt, function(err, hash) {
            if (err) return next(err);
     
            // override the cleartext password with the hashed one
            reqObj.password = hash;
            authDbApi.registerNewUser(reqObj, responseCallback);
        });
    });
}

exports.renderPage = renderPage;
exports.login = login;
exports.checkForUser = checkForUser;
exports.registerNewUser = registerNewUser; 