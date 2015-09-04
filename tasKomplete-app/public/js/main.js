define(['react'],function(React){
	
	console.log('Loaded the Home Page');
	var userName = document.getElementById('usernameHeader').getAttribute('data-user-name');
	if(userName){
		define(['./components/todo-app'],function(TodoApp){
			React.render(<TodoApp userName={userName} />, document.getElementById('componentContainer'));
		});		
	}else{
		define(['./components/home-page'],function(HomePage){
			React.render(<HomePage />, document.getElementById('componentContainer'));
		});		
	}
	//console.log($('#userName'));
});

//webpack --progress --colors --watch (for development)
//webpack -p (for production)