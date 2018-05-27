/**
 * @author booleanhunter
 * @about Logic for the header component
 */

define(['react'],function(React){
	var Header = React.createClass({
		render: function(){
			if(this.props.username){
				return (
					<header className="header-fixed">

						<div className="header-limiter">

							<h1>
								<a href="#">
									tasKomplete
									{/*<span>logo</span>*/}
								</a>
							</h1>

							<nav>
								<a href="#">Welcome, {this.props.username}</a>
								<span> </span>
								<a href="/logout">Logout</a>
							</nav>

						</div>

					</header>
				)
			}else{
				return (
					<div id="header">
						<h2>Welcome to tasKomplete. Organize your tasks, keep track of active ones, and increase your productivity!</h2> 
					</div>
				)
			}
			
		}
	});

	return Header
});