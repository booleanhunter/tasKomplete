define(['react'],function(React){
	
	console.log('Loaded the Home Page');
	var userName = document.getElementById('usernameHeader').getAttribute('data-user-name');
	
	if(!userName){
		define(['./components/home-page'],function(HomePage){
			React.render(<HomePage />, document.getElementById('componentContainer'));
		});		
	}else{
		window.location.replace('/mytodos');	
	}
	//console.log($('#userName'));
});

//webpack --progress --colors --watch (for development)
//webpack -p (for production)