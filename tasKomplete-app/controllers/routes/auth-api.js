/**
 * @author booleanhunter
 * @about Configuring the API related to authentication and invoking other authentication modules
 */

var authApiHandlers = require('../route-handlers/auth-api-handlers');
var todosApiHandlers = require('../route-handlers/todos-api-handlers');

function initialize(expressInstance) {
    var app = expressInstance,
        debug = require('debug')('taskomplete:auth-api');

    app.post('/signup/username/verify', function(req, res){
        debug('request to /signup/username/verify');
        authApiHandlers.checkForUser(req, function(responseData){
            res.json(responseData);
        });
    });

    app.post('/signup', function(req, res){
        authApiHandlers.registerNewUser(req, function(err, responseData){
            if(err){
                res.send({
                    status: 'Error in registering user'
                });
            }else{
                req.session.regenerate(function(){
                    req.session.user = {
                        username: responseData.username,
                        displayName: responseData.displayName,
                        status: responseData.status
                    };
                    
                    res.json({
                        status: 'authenticated'
                    });                          
                });              
            }
        });
    });

    app.post('/login', function(req, res) {
        debug('request to /login');
        authApiHandlers.login(req, function(responseData){
            debug(responseData);
            if(responseData.username){

                req.session.regenerate(function(){
                    req.session.user = {
                        username: responseData.username,
                        displayName: responseData.displayName,
                        status: 'loggedIn'
                    };
                    responseData.status = 'loggedIn'; 
                    res.json(responseData);                        
                });         
            }else{
                responseData.status = 'authentication failure';
                res.json(responseData);
            }   
        });
    });

    app.get('/logout', function(req, res) {
        debug('request to /logout');
        req.session.destroy(function(){
            res.redirect('/');
        });
    });

    app.get('/',function(req, res){
        debug('request to /');
        authApiHandlers.renderPage(req, function(argOne, argTwo){
            res.render(argOne, argTwo);
        });
    });
}

exports.initialize = initialize;