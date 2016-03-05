
var configMongoDb = require('../configs/db-configs/config-mongodb');

var mongoDBClient = configMongoDb.mongoClientDB();
	debug = require('debug')('taskomplete:auth-db-api');

exports.registerNewUser = function(reqObj, callback){
	mongoDBClient.collection("userData").insert({
		username: reqObj.userName,
		password: reqObj.password
	},function(err, results){
		var resultData = {};
		if(err){
			resultData = {
				error: err,
				message: 'Execute failed in registerNewUser'
			};
			callback(resultData);
		}else{
			resultData = {
				userName: reqObj.userName,
				displayName: reqObj.displayName,
				status: 'loggedIn'
			}
			callback(null, resultData);
		}
	});
}

exports.checkForUser = function(reqObj, callback){
	mongoDBClient.collection("userData").findOne({
		username: reqObj.userName
	}, function(err, results){
		var resultData = {};
		if(err){
			resultData = {
				error: err,
				message: 'Execute failed in checkForUser'
			};
			callback(resultData);
		}else{
			if(results){
				resultData = {
					userName: results.username,
					displayName: null,
					password: results.password
				};
			}else{
				resultData = {
					userName: null,
					displayName: null,
					password: null
				};
			}
			callback(null, resultData);
		}	
	});
}