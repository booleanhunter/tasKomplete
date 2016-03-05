/*  @author Ashwin Iyer
 * @details These are the API handlers for todo related stuff
 */

var async = require('async');
var todosDbApi = require('../../database/todos-db-api');
var debug = require('debug')('taskomplete:todos-api-handlers');

function renderPage(req, responseCallback){
    var argOne = 'index',
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

function fetchAllTodos(req, responseCallback){
    todosDbApi.fetchAllTodos(req.session.user, responseCallback);
}

function fetchNotifications(req, responseCallback){
    todosDbApi.fetchNotifications(req.session.user, responseCallback);
}

function createNewTodo(req, responseCallback){
    var reqObj = req.body;
    reqObj.userName = req.session.user.userName;
    todosDbApi.createNewTodo(reqObj, responseCallback);
}

function saveTodo(req, responseCallback){
    todosDbApi.saveTodo(req.body, responseCallback);
}

function deleteTodo(req, responseCallback){
    todosDbApi.deleteTodo(req.body, responseCallback);
}

function markAsFinished(req, responseCallback){
    todosDbApi.markAsFinished(req.body, responseCallback);
}

function markAsActive(req, responseCallback){
    todosDbApi.markAsActive(req.body, responseCallback);
}

function assignTodo(req, responseCallback){
    if(req.session.user){
        var reqObj = req.body;
        reqObj.userName = req.session.user.userName;
        
        async.auto(
            {
                one: function(callback){
                    todosDbApi.checkForUser(req.session.user, callback);
                },
                two: ['one', function(results, callback){
                    todosDbApi.assignTodo(reqObj, callback);
                }]
            },
            function(err, results){
                var resultData = {};
                if(err){
                    debug(err);
                    resultData = {
                        status: 'invalid'
                    }
                }else{
                    resultData = {
                        status: 'valid'
                    }
                }
                responseCallback(resultData);
            }                  
        )
    }
}

exports.renderPage = renderPage;
exports.fetchAllTodos = fetchAllTodos;
exports.fetchNotifications = fetchNotifications;
exports.createNewTodo = createNewTodo;
exports.saveTodo = saveTodo;
exports.deleteTodo = deleteTodo;
exports.markAsFinished = markAsFinished;
exports.markAsActive = markAsActive;
exports.assignTodo = assignTodo;