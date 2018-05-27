/**
 * @author booleanhunter
 * @about Creating a single open instance of redis and returning it, this single instance is used for all db operations
 */
 
var redis = require('redis');     
var redisClient, that = this;

function configure(callback) {
	that.redisClient = redis.createClient();
    callback(null, 'connection with redis established');
}

function redisClient(){
    return that.redisClient;
}

exports.configure = configure;
exports.redisClient = redisClient;