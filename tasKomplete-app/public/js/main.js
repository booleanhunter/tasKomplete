define(['react'],function(React){
	
	console.log('Loaded the Home Page');
	var usernameHeader = document.getElementById('usernameHeader').getAttribute('data-user-name');
	if(usernameHeader){
		define(['./components/todo-app'],function(TodoApp){
			React.render(<TodoApp username={usernameHeader} />, document.getElementById('componentContainer'));
		});		
	}else{
		define(['./components/home-page'],function(HomePage){
			React.render(<HomePage />, document.getElementById('componentContainer'));
		});		
	}
	//console.log($('#usernameHeader'));
});

//webpack --progress --colors --watch (for development)
//webpack -p (for production)