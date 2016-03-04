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

            app.get('/todos', function(req, res){
                debug('request to GET /todos');
                todosApiHandlers.fetchAllTodos(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }               
                });
            });

            app.get('/notifications', function(req, res){
                debug('request to /notifications');
                todosApiHandlers.fetchNotifications(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });
            });

            app.post('/todos', function(req, res){
                debug('request to POST /todos');
                todosApiHandlers.createNewTodo(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });
            });

            app.post('/todo/update', function(req, res){
                debug('request to /todo/update');
                todosApiHandlers.saveTodo(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });         
            });

            app.post('/todo/delete', function(req, res){
                debug('request to /todo/delete');
                todosApiHandlers.deleteTodo(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });           
            });

            app.post('/todo/mark_complete', function(req, res){
                debug('request to /todo/mark_complete');
                todosApiHandlers.markAsFinished(req, function(err, responseData){
                    if(err){
                        debug(err);
                    }else{
                        res.json(responseData);
                    }
                });         
            });

            app.post('/todo/mark_incomplete', function(req, res){
                debug('request to /todo/mark_incomplete');
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

            app.get('/mytodos',function(req, res){
                debug('request to /');
                todosApiHandlers.renderPage(req, function(argOne, argTwo){
                    res.render(argOne, argTwo);
                });
            });

            
        }
        return {
            initialize: initialize
        }
    }
);