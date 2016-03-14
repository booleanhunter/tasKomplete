/**
 * @author booleanhunter
 * @about Database operations for authentication module
 */

var configMongoDb = require('../configs/db-configs/config-mongodb');

var mongoDBClient = configMongoDb.mongoClientDB();
	debug = require('debug')('taskomplete:auth-db-api');

exports.registerNewUser = function(reqObj, callback){
	mongoDBClient.collection("userData").insert({
		username: reqObj.username,
		password: reqObj.password,
		signupDate: reqObj.signupDate
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
				username: reqObj.username,
				displayName: reqObj.displayName,
				status: 'loggedIn'
			}
			callback(null, resultData);
		}
	});
}

exports.checkForUser = function(reqObj, callback){
	mongoDBClient.collection("userData").findOne({
		username: reqObj.username
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
					username: results.username,
					displayName: null,
					password: results.password
				};
			}else{
				resultData = {
					username: null,
					displayName: null,
					password: null
				};
			}
			callback(null, resultData);
		}	
	});
}