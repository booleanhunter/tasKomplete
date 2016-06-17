/**
 * @author booleanhunter
 * @about Entry point for login screen
 */

define(['react'],function(React){
	var username = document.getElementById('usernameHeader').getAttribute('data-user-name');
	
	if(!username){
		define(['./components/home-page'],function(HomePage){
			React.render(<HomePage />, document.getElementById('componentContainer'));
		});		
	}else{
		window.location.replace('/mytodos');	
	}
});