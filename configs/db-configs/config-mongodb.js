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

    if(process.argv.indexOf("-mongoip") != -1){ //does our flag exist?
        server = 'mongodb://' + process.argv[process.argv.indexOf("-mongoip") + 1] + ':27017/todoAppDB'; //grab the next item
    }

    that.MongoClient.on('serverOpening', function(event){
        console.log('connected') 
        console.log(event)
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