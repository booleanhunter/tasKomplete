define(['exports'],function(exports){
	var db;
	var ObjectID = require('mongodb').ObjectID;
	exports.initialize = function(db){
		this.db = db;
		console.log('db initialized');
	};
	exports.registerNewUser = function(req,callback){
		this.db.collection("userData").insert({
			username: req.body.username,
			password: req.body.password
		},callback);
	}

	exports.checkForUser = function(username,callback){
		this.db.collection("userData").findOne({
			username:username
		},callback);
	}

	exports.fetchAllTodos = function(req,callback){
		console.log(req.user.username);
		this.db.collection("todoData").find({
			username: req.user.username
		}).sort({date:-1}).toArray(callback);
	}

	exports.fetchNotifications = function(req,callback){
		console.log(req.user.username);
		this.db.collection("notifications").find({
			assignTo: req.user.username
		}).sort({date:-1}).toArray(callback);
	}

	exports.createNewTodo = function(req,callback){
		this.db.collection("todoData").insert({
			username: req.user.username,
			content: req.body.todoContent,
			finishStatus: false,
			date: new Date()
		},callback);
	}

	exports.saveTodo = function(req,callback){
		this.db.collection("todoData").update({
			_id: new ObjectID(req.body.todoId)
		},{
			$set:{content:req.body.todoContent}
		},callback);
	}

	exports.deleteTodo = function(req,callback){
		this.db.collection("todoData").remove({
			_id: new ObjectID(req.body.todoId)
		},callback);
	}

	exports.markAsFinished = function(req,callback){
		this.db.collection("todoData").update({
			_id: new ObjectID(req.body.todoId)
		},{
			$set:{finishStatus:true}
		},callback);
	}

	exports.markAsActive = function(req,callback){
		this.db.collection("todoData").update({
			_id: new ObjectID(req.body.todoId)
		},{
			$set:{finishStatus:false}
		},callback);
	}

	exports.assignTodo = function(req,callback){
		this.db.collection("notifications").insert({
			assignor: req.user.username,
			assignTo:req.body.assignTo,
			content: req.body.todoContent,
			date: new Date()
		},callback);
	}
});