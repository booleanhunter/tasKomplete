define(
	[
		'exports',
		'../configs/db-configs/config-mongodb'
	],
	function(exports, configMongo){
	
		var mongoDBClient = configMongo.mongoClientDB(),
			ObjectID = configMongo.mongoObjectId(),
			debug = require('debug')('todoapp:todos-db-api');

		exports.registerNewUser = function(req,callback){
			mongoDBClient.collection("userData").insert({
				username: req.body.username,
				password: req.body.password
			},callback);
		}

		exports.checkForUser = function(reqObj, callback){
			mongoDBClient.collection("userData").findOne({
				username:username
			}, function(err, results){
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in checkForUser'
					};
					callback(resultData);
				}else{
					if(results.length > 0){
						resultData = {
							userName: results
						};
					}else{
						resultData = {
							userName: []
						};
					}
					callback(null, resultData);
				}	
			});
		}

		exports.fetchAllTodos = function(reqObj, callback){
			mongoDBClient.collection("todoData").find({
				username: reqObj.userName
			}).sort({date:-1}).toArray(function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in fetchAllTodos'
					};
					callback(resultData);
				}else{
					if(results.length > 0){
						resultData = {
							allTodos: results
						};
					}else{
						resultData = {
							allTodos: []
						};
					}
					callback(null, resultData);
				}
			});
		}

		exports.fetchNotifications = function(reqObj, callback){
			mongoDBClient.collection("notifications").find({
				assignTo: reqObj.userName
			}).sort({date:-1}).toArray(function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in fetchNotifications'
					};
					callback(resultData);
				}else{
					if(results.length > 0){
						resultData = {
							notifications: results
						};
					}else{
						resultData = {
							notifications: []
						};
					}
					callback(null, resultData);
				}
			});
		}

		exports.createNewTodo = function(reqObj, callback){
			mongoDBClient.collection("todoData").insert({
				username: reqObj.userName,
				content: reqObj.todoContent,
				finishStatus: false,
				date: new Date()
			}, function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in createNewTodo'
					};
					callback(resultData);
				}else{
					if(results.length > 0){
						resultData = {
							status: 'New Todo created'
						};
					}
					callback(null, resultData);
				}
			});
		}

		exports.saveTodo = function(reqObj, callback){
			mongoDBClient.collection("todoData").update({
				_id: new ObjectID(reqObj.todoId)
			},{
				$set: {content: reqObj.todoContent}
			}, function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in saveTodo'
					};
					callback(resultData);
				}else{
					resultData = {
						status: 'Todo is saved',
						docs: results
					};
					callback(null, resultData);
				}
			});
		}

		exports.deleteTodo = function(reqObj, callback){
			mongoDBClient.collection("todoData").remove({
				_id: new ObjectID(reqObj.todoId)
			}, function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in deleteTodo'
					};
					callback(resultData);
				}else{
					resultData = {
						status: 'Todo is deleted',
						docs: results
					};
					callback(null, resultData);
				}
			});
		}

		exports.markAsFinished = function(reqObj, callback){
			mongoDBClient.collection("todoData").update({
				_id: new ObjectID(reqObj.todoId)
			},{
				$set: {finishStatus: true}
			}, function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in markAsFinished'
					};
					callback(resultData);
				}else{
					resultData = {
						status: 'Todo is finished',
						docs: results
					};
					callback(null, resultData);
				}
			});
		}

		exports.markAsActive = function(reqObj, callback){
			mongoDBClient.collection("todoData").update({
				_id: new ObjectID(reqObj.todoId)
			},{
				$set: {finishStatus: false}
			},function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in markAsFinished'
					};
					callback(resultData);
				}else{
					resultData = {
						status: 'Todo is activated',
						docs: results
					};
					callback(null, resultData);
				}
			});
		}

		exports.assignTodo = function(reqObj, callback){
			mongoDBClient.collection("notifications").insert({
				assignor: reqObj.username,
				assignTo: reqObj.assignTo,
				content: reqObj.todoContent,
				date: new Date()
			}, function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in markAsFinished'
					};
					callback(resultData);
				}else{
					resultData = {
						status: 'valid'
					};
					callback(null, resultData);
				}
			});
		}
	}
);