/**
 * @author booleanhunter
 * @about Entry point for the todos screen after login
 */

define(['react', 'react-dom'],function(React, ReactDOM){
	var username = document.getElementById('usernameHeader').getAttribute('data-user-name');

	if(username){
		define(['./components/todo-app'],function(TodoApp){
			ReactDOM.render(<TodoApp username={username} />, document.getElementById('componentContainer'));
		});		
	}else{
		window.location.replace('/');		
	}
});