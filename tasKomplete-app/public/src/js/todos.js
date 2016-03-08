/**
 * @author booleanhunter
 * @about Entry point for the todos screen after login
 */

define(['react'],function(React){
	var username = document.getElementById('usernameHeader').getAttribute('data-user-name');

	if(username){
		define(['./components/todo-app'],function(TodoApp){
			React.render(<TodoApp username={username} />, document.getElementById('componentContainer'));
		});		
	}else{
		window.location.replace('/');		
	}
});