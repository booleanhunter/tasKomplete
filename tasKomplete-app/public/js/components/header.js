define(['react','jquery'],function(React,$){
	var Header = React.createClass({
		render: function(){
			if(this.props.userName){
				return (
					<div id="header" className="header">
						<div id="header-left">
							<h3>tasKomplete</h3>
						</div>
						<div id="header-middle">
							<h3>Welcome, {this.props.userName}</h3>
						</div>
						<div id="header-right">
							<div id="logout-button">
								<a href="/logout"> Logout </a>
							</div>
						</div>
					</div>
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