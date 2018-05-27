/**
 * @author booleanhunter
 * @about Creating a single open instance of mongoDb and returning it, this single instance is used for all db operations
 */

var mongodb = require('mongodb');
var MongoClient, mongoClientInstance, ObjectID, that = this;

function configure(callback) {
    that.MongoClient = mongodb.MongoClient,
        Server = mongodb.Server;

    var server = 'mongodb://mongo:27017/todoAppDB';

    // if(process.argv.indexOf("-mongoip") != -1){ //does our flag exist?
    //     server = 'mongodb://' + process.argv[process.argv.indexOf("-mongoip") + 1] + ':27017/todoAppDB'; //grab the next item
    // }


    that.MongoClient.connect(server, {
        autoReconnect: true,
        reconnectTries: 100
        // db: {
        //     native_parser: false,
        //     retryMiliSeconds: 100000,
        //     numberOfRetries: 100
        // },
        // server: {
        //     socketOptions: {
        //         connectTimeoutMS: 500
        //     }
        // }
    }, function(err, db){
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