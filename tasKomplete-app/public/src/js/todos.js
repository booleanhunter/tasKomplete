define(['react'],function(React){
	
	console.log('Loaded the Home Page');
	var userName = document.getElementById('usernameHeader').getAttribute('data-user-name');
	if(userName){
		define(['./components/todo-app'],function(TodoApp){
			React.render(<TodoApp userName={userName} />, document.getElementById('componentContainer'));
		});		
	}else{
		window.location.replace('/');		
	}
	//console.log($('#userName'));
});

//webpack --progress --colors --watch (for development)
//webpack -p (for production)