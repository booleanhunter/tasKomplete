/**
 * @author booleanhunter
 * @about Entry point for login screen
 */

define(['react', 'react-dom'],function(React, ReactDOM){
	var username = document.getElementById('usernameHeader').getAttribute('data-user-name');
	
	if(!username){
		define(['./components/home-page'],function(HomePage){
			ReactDOM.render(<HomePage />, document.getElementById('componentContainer'));
		});		
	}else{
		window.location.replace('/mytodos');	
	}
});