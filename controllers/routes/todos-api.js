/**
 * @author booleanhunter
 * @about Configuring the API related to retrieving, storing and deleting todos
 */

var todosApiHandlers = require('../route-handlers/todos-api-handlers');

function initialize(expressInstance) {
    var app = expressInstance,
        debug = require('debug')('taskomplete:todos-api');

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
        debug('request to /mytodos');
        todosApiHandlers.renderPage(req, function(argOne, argTwo){
            res.render(argOne, argTwo);
        });
    });   
}

exports.initialize = initialize