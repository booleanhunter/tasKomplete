//Use this file for writing and executing cassandra queries when repetitive operations have to be performed

var cql = require('node-cassandra-cql');
var toorqDevClient = new cql.Client({
    hosts: ['127.0.0.1:9042'],
    keyspace: 'toorq_dev'
});

var toorqDbClient = new cql.Client({
    hosts: ['127.0.0.1:9042'],
    keyspace: 'toorq_db'
});

var toorqBackupClient = new cql.Client({
    hosts: ['127.0.0.1:9042'],
    keyspace: 'toorq_backup'
});

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
MongoClient.connect(server, function(err,db){
            dbApi.initialize(db);
        });

var dataTypes = cql.types.dataTypes;

var async = require('async');

function test(arg){
	if(arg === 'start'){
		console.log('this function is executed');
	}else{
		console.log('Type start after the function name to execute this function.');
	}
}

function aboutThisFile(){
	console.log('This file was created by me to perform any repetitive database operations in Cassandra. This file contains a list of functions written for specific purposes. To know more about a function, just type the function name. To execute any of these functions, type the function name followed by \'start\'.')
	console.log('When you write your own function here, make sure to follow the guidelines so that the wrong function does not get executed accidentally and cause a disaster.');
	console.log('Make sure that the function which you write get executed only when start keyword is included');
}

function showFunctions(){
	console.log('List of Functions');
	console.log(Object.keys(handle));
}

function addHierarchy(arg){
	if(arg === 'start'){
		console.log('addHierarchy');
		var query = 'SELECT * FROM location_subscriptions WHERE toorq_name = ?',
			params = [arg];

		function getLocationProfile(locationUrl, callback){
			var queryOne = 'select * from location_profiles WHERE location_url = ?',
				paramsOne  = [locationUrl];
		}
		toorqDbClient.execute(query, params, function(err, result){

		});
	}
	
}



function dbOps(){	
	var a = "COPY location_posts (location_url , post_category , post_date , post_id , audio_url , channel_names , channel_types, channel_urls, display_name , display_picture , downvotes , hierarchical_names , hierarchy_urls , link_url , no_of_comments , picture_url , post_content , toorq_name , upvotes , video_url , youtube_url ) TO 'toorq_db-location_posts.csv'";
	var b = "COPY channel_posts (channel_url , post_category , post_date , post_id , audio_url , channel_names , channel_types, channel_urls , display_name , display_picture , downvotes , hierarchical_names , hierarchy_urls , link_url , location_url , no_of_comments , picture_url , post_content , toorq_name , upvotes , video_url , youtube_url ) TO 'toorq_db-channel_posts.csv'";
	var c = "COPY user_posts (toorq_name , post_category , post_date , post_id , audio_url , channel_names , channel_types, channel_urls , display_name , display_picture , downvotes , hierarchical_names , hierarchy_urls , link_url , location_url , no_of_comments , picture_url , post_content , upvotes , video_url , youtube_url ) TO 'toorq_db-user_posts.csv'";
	var d = "COPY placeid_hierarchy (country_name , place_id , hierarchical_names , hierarchy_urls , lat_lng , place_name , place_url , types ) from 'toorq_db-placeid_hierarchy.csv'";
	var e = "COPY location_profiles (location_url , cover_pictures , cover_type , cover_videos , cover_youtube_videos , display_picture , hierarchical_names , hierarchy_urls , lat_lng , location_creation_date , location_name , nodeid , place_id , posts , subscribers , traction_factor , types , views ) FROM 'toorq_db-location_profiles.csv'";
	var f = "COPY channel_profiles (channel_url , categories , channel_creation_date , channel_name , channel_type , cover_pictures , cover_type , cover_videos , cover_youtube_videos , description,  display_picture , hierarchical_names , hierarchy_urls , place_id , posts , subscribers , traction_factor , trust_factor,views ) FROM 'toorq_db-channel_profiles.csv'";
	var g = "COPY user_profiles (toorq_name , cover_pictures , cover_type , cover_videos , cover_youtube_videos , display_name , display_picture , email , facebook_data , hierarchical_names , hierarchy_urls , last_login_date , phone_number , place_id , posts , profile_creation_date , subscribers , traction_factor , trust_factor , user_privilege , views ) FROM 'toorq_db-user_profiles.csv'";
}

var handle = {};
handle["test"] = test;
handle["aboutThisFile"] = aboutThisFile;
handle["showFunctions"] = showFunctions;

if(typeof handle[process.argv[2]] === 'function'){  //if the request handler for the requested function exists
    handle[process.argv[2]](process.argv[3]);                      //call the appropriate request handler function aboutThisFile('start')
}else{
    console.log("Please enter an existing function in this file. You need to type the function name along with keyword start. For example node dbOperations.js test start");
    showFunctions();
}

// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });