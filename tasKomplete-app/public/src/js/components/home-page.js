/**
 * @author booleanhunter
 * @about Logic for Rendering the login and signup sections
 */

define(
	[
		'react',
		'./header',
		'../common-functions'
	],
	function(React, Header, commonFunctions){

		var HomePage = React.createClass({
			signup:{
				usernameStatus:'false'
			},
			verifyLogin:function(){
				var username = document.getElementById('loginNameInput').value,
					password = document.getElementById('loginPwInput').value;

				var postData = {
					username: username,
					password: password 
				};

				var successCallback = function(data){
					if(data.status === 'loggedIn'){
						window.location.replace('/mytodos');
					}else if(data.status === 'authentication failure'){
						document.getElementById('loginErrMsg').innerHTML = "Looks like you entered wrong credentials. Please try again"
					}
				}

				commonFunctions.sendHTTPPostRequest('/login', postData, successCallback);
			},
			checkForUsername:function(){
				var username = document.getElementById('signupNameInput');
				if(username.value !== ''){
					var postData = {
						username: username.value
					};

					var successCallback = function(data){
						if(data.status === 'unavailable'){
							document.getElementById('signupNameMsg').innerHTML = 'username not available';
							this.signup.usernameStatus = 'false';

						}else if(data.status === 'available'){
							document.getElementById('signupNameMsg').innerHTML = 'username available';
							this.signup.usernameStatus = 'ok';
						}
					}.bind(this)

					commonFunctions.sendHTTPPostRequest('/signup/username/verify', postData, successCallback);
				}else{
					this.signup.usernameStatus = 'false';
				}
			},
			signup:function(){
				var username = document.getElementById('signupNameInput').value,
					pwOne = document.getElementById('signupPwInputOne').value,
					pwTwo = document.getElementById('signupPwInputTwo').value,
					that = this;
				if(pwOne !== pwTwo){
					document.getElementById('signupPwMsg').innerHTML = 'Passwords do not match';
				}else if(that.signup.usernameStatus === 'ok' && pwOne !== ''){
					var postData = {
						username: username,
						password: pwOne 
					};

					var successCallback = function(data){
						window.location.replace('/mytodos');
					};

					commonFunctions.sendHTTPPostRequest('/signup', postData, successCallback);

				}else{
					console.log('username exists');
				}
			},
		  	render:function(){
		  		var that = this;
			    return (
			    	<div id="homePage">
			    		
			    		<div id="main" className="section group">
			    			<Header />
			    			<div id="contentWrapper" className="section group">
					     		<div id="loginSection" className="column loginSection">
					     			<h5>Existing user?</h5>
					     			<h3 id="loginHeader">Login</h3>
						    		<p className="inputClassOne">
						     			<input type = "text" id="loginNameInput" placeholder="User-name"/>
						     		</p>
						     		<p className="inputClassOne">
						     			<input type= "password" id = "loginPwInput" placeholder="Password"/>
						     		</p>
						     		<div onClick={that.verifyLogin} className="buttonClassOne" id="loginButton">Login</div>		
						     		<div id = "loginErrMsg"></div>
						     	</div>

					     		<div id="signupSection" className="column signupSection">
					     			<h5>Are you a new user?</h5>
					     			<h3 id="signupHeader">Sign Up!</h3>
					     			<p className="inputClassOne" >
					     				<input type="text" id="signupNameInput" placeholder="Choose a username" onBlur={that.checkForUsername} />
					     				<div id="signupNameMsg"></div>
					     			</p>
					     			<p className="inputClassOne" >
					     				<input type="password" id="signupPwInputOne" placeholder="Choose a password" />
					     				<br/><br/>
					     				<input type="password" id="signupPwInputTwo" placeholder="Re-enter your password" />
					   					<div id="signupPwMsg"></div>
					     			</p>
					     			<div onClick={that.signup} className="buttonClassOne" id="signupButton">Sign Up!</div>	
					     		</div>
					     	</div>
					     	
				     		<div id="bgImg"></div>
				     		<div className="overlay"></div>
				     	</div>	
	 		    	</div>
			    );
		  	}
		});

		return HomePage;
	}
)
