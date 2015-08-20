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

            app.get('/',function(req, res){
                debug('request to /');
                authApiHandlers.renderPage(req, function(argOne, argTwo){
                    res.render(argOne, argTwo);
                });
            });

            app.post('/checkforuser',function(req,res){
                debug('request to /checkforuser');
                authApiHandlers.checkForUser(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });
            });

            app.post('/signup',function(req, res){
                dbApi.registerNewUser(req, function(err, responseData){
                    if(err){
                        res.send({
                            status:'Error in registering user'
                        });
                    }else{
                        if(results.length > 0){
                            req.session.regenerate(function(){
                                req.session.user = {
                                    userName: responseData.userName,
                                    displayName: responseData.displayName,
                                    status: responseData.status
                                };
                                
                                // if(req.body.gcmId)
                                //     authApiHandlers.addAndroidRegId(req,res);
                                
                                res.json({
                                    status:'authenticated'
                                });                          
                            });
                        }               
                    }
                });
            });
            app.post('/authenticate', function(req, res) {
                authApiHandlers.registerNewUser(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        req.session.user = {
                            userName: responseData.userName,
                            displayName: responseData.displayName,
                            status: responseData.status
                        };
                        res.json(resultData);
                    }
                });
            });

            app.get('/logout', function (req, res) {
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