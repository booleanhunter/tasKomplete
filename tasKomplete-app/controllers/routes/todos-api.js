/* Copyright Toorq Media Services
 * @author Ashwin Iyer
 * @details Configuring the API related to authentication and invoking other authentication modules
 */
define(
    [
        '../route-handlers/todos-api-handlers'
    ],
    function(todosApiHandlers) {
        function initialize(expressInstance) {
            //passport configurations
            var app = expressInstance,
                debug = require('debug')('todoapp:todos-api');

            app.get('/fetchalltodos', function(req, res){
                debug('request to /fetchalltodos');
                todosApiHandlers.fetchAllTodos(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }               
                });
            });

            app.get('/fetchnotifications', function(req, res){
                debug('request to /fetchnotifications');
                todosApiHandlers.fetchNotifications(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });
            });

            app.post('/createnewtodo', function(req, res){
                debug('request to /createnewtodo');
                todosApiHandlers.createNewTodo(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });
            });

            app.post('/savetodo', function(req, res){
                debug('request to /savetodo');
                todosApiHandlers.saveTodo(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });         
            });

            app.post('/deletetodo', function(req, res){
                debug('request to /deletetodo');
                todosApiHandlers.deleteTodo(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });           
            });

            app.post('/markasfinished', function(req, res){
                debug('request to /markasfinished');
                todosApiHandlers.markAsFinished(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });         
            });

            app.post('/markasactive', function(req, res){
                debug('request to /markasactive');
                todosApiHandlers.markAsActive(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });          
            });

            app.post('/assigntodo',function(req,res){
                debug('request to /assigntodo');
                todosApiHandlers.assignTodo(req, function(responseData){
                    res.json(responseData);
                });
            });

            
        }
        return {
            initialize: initialize
        }
    }
);