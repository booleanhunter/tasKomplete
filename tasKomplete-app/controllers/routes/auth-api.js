/* Copyright Toorq Media Services
 * @author Ashwin Iyer
 * @details Configuring the API related to authentication and invoking other authentication modules
 */
define(
    [
        '../route-handlers/auth-api-handlers',
        '../route-handlers/todos-api-handlers'
    ],
    function(authApiHandlers, todosApiHandlers) {
        function initialize(expressInstance) {
            //passport configurations
            var app = expressInstance,
                debug = require('debug')('todoapp:auth-api');

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
                                userName: responseData.userName,
                                displayName: responseData.displayName,
                                status: responseData.status
                            };
                            
                            // if(req.body.gcmId)
                            //     authApiHandlers.addAndroidRegId(req,res);
                            
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
                    if(responseData.userName){

                        req.session.regenerate(function(){
                            req.session.user = {
                                userName: responseData.userName,
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
                //req.logOut();
                /*Check out the revision 2 made in this above link*/
                req.session.destroy(function(){
                    res.redirect('/');
                });
            });
        }
        return {
            initialize: initialize
        }
    }
);