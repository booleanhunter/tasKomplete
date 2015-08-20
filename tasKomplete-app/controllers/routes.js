define(
	[
		'./routes/auth-api',
		'./routes/todos-api'
	],
	function(authApi, todosApi){
		function initialize(expressInstance){
			
			authApi.initialize(expressInstance);	
			todosApi.initialize(expressInstance);		
		}
		return {
			initialize: initialize
		}
	}
);