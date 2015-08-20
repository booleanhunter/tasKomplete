define(
	[
		'exports',
		'../configs/db-configs/config-mongodb'
	],
	function(exports, configMongo){
		var mongoDBClient = configMongo.mongoClientDB();
			debug = require('debug')('todoapp:todos-db-api');

		exports.registerNewUser = function(reqObj, callback){
			mongoDBClient.collection("userData").insert({
				username: reqObj.username,
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
					if(results.length > 0){
						resultData = {
							status: 'exists'
						};
					}else{
						resultData = {
							status: 'available'
						};
					}
					callback(null, resultData);
				}	
			});
		}
	}
)	