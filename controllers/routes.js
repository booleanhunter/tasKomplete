var authApi = require('./routes/auth-api');
var todosApi = require('./routes/todos-api');

function initialize(expressInstance){
	
	authApi.initialize(expressInstance);	
	todosApi.initialize(expressInstance);		
}

exports.initialize = initialize;