define(['react','jquery'],function(React,$){
	var Header = React.createClass({
		render: function(){
			return (
				<div id="header">
					<h2 id="mainHeader">Welcome to tasKomplete. Keep track of your tasks and increase your productivity!</h2>
				</div>
			)
		}
	});

	return Header
});