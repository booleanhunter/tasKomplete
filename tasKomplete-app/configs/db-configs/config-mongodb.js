/* @author Ashwin Hariharan
 * @details Creating a single open instance of mongoDb and returning it, this single instance is used for all db operations
 */

var mongodb = require('mongodb');
var MongoClient, mongoClientInstance, ObjectID, that = this;

function configure(callback) {
    that.MongoClient = mongodb.MongoClient,
        Server = mongodb.Server;
    var server = 'mongodb://localhost:27017/todoAppDB';

    that.MongoClient.connect(server, function(err, db){
        if(err){
            var error = {
                message: 'MongoDB connect failed',
                error: err
            }
            callback(error);
        }else{
            that.mongoClientInstance = db;
            that.ObjectID = mongodb.ObjectID;
            callback(null, 'Connection with mongodb established');
        }
        
    });        
}

function mongoClientDB(){
    return that.mongoClientInstance;
}

function mongoObjectId(){
    return that.ObjectID;
}
exports.configure = configure;
exports.mongoClientDB = mongoClientDB;
exports.mongoObjectId = mongoObjectId;