define(['react','jquery','./header'],function(React,$,Header){
	var HomePage = React.createClass({
		signup:{
			usernameStatus:'false'
		},
		verifyLogin:function(){
			console.log('Login clicked');
			var username = document.getElementById('loginNameInput').value,
				password = document.getElementById('loginPwInput').value,
				postData = {
					username: username,
					password: password 
				};
			//this code needs to be changed as the authentication technique is not secure.
			$.ajax({
			    type:'POST',
			    url:'/authenticate',
			    data:postData,
			    datatype:'json',
			    success: function(data){
			    	if(data.status === 'authenticated'){
			    		window.location.replace('/');
			    	}else if(data.status === 'authentication failure'){
			    		document.getElementById('loginErrMsg').innerHTML = "The username does not exist!"
			    	}else if(data.status === 'password failure'){
			    		document.getElementById('loginErrMsg').innerHTML = "It looks like you entered a wrong password. Please try again.";
			    	}                
			    }.bind(this),
			    error: function(httpRequest,status,error){
			    	window.location.replace('/');
			    }
			});
		},
		checkForUsername:function(){
			var username = document.getElementById('signupNameInput');
			if(username.value !== ''){
				var postData = {
					username:username.value
				};
				$.ajax({
				    type:'POST',
				    url:'/checkforuser',
				    data:postData,
				    datatype:'json',
				    success: function(data){
				  		if(data.status === 'exists'){
				  			document.getElementById('signupNameMsg').innerHTML = 'Username not available';
				  			this.signup.usernameStatus = 'false';

				  		}else if(data.status === 'available'){
				  			document.getElementById('signupNameMsg').innerHTML = 'Username available';
				  			this.signup.usernameStatus = 'ok';
				  		}
				    }.bind(this),
				    error: function(httpRequest,status,error){
				    	window.location.replace('/');
				    }
				});
			}else{
				this.signup.usernameStatus = 'false';
			}
		},
		signup:function(){
			var userName = document.getElementById('signupNameInput').value,
				pwOne = document.getElementById('signupPwInputOne').value,
				pwTwo = document.getElementById('signupPwInputTwo').value,
				that = this;
			if(pwOne !== pwTwo){
				document.getElementById('signupPwMsg').innerHTML = 'Passwords do not match';
			}else if(that.signup.usernameStatus === 'ok' && pwOne !== ''){
				var postData = {
					username: userName,
					password: pwOne 
				};
				$.ajax({
				    type:'POST',
				    url:'/signup',
				    data:postData,
				    datatype:'json',
				    success: function(data){
				    	window.location.replace('/');             
				    }.bind(this),
				    error: function(httpRequest,status,error){
				    	window.location.replace('/');
				    }
				});
			}else{
				console.log('username exists');
			}
		},
	  	render:function(){
	  		var that = this;
		    return (
		    	<div id="homePage">
		    		<Header />

		    		<div id="main" className="section group">

			     		<div id="loginSection" className="column loginSection">
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
			     			<h3 id="signupHeader">Are you a new user? Sign Up!</h3>
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

			     		<div id="bgImg"></div>
			     		<div className="overlay"></div>
			     	</div>	
 		    	</div>
		    );
	  	}
	});
	return HomePage;
})
