define(['react','jquery'],function(React,$){
	var Header = React.createClass({
		render: function(){
			return (
				<div id="header">
					<h2 id="mainHeader">A todo app built using Node-Express, React, Mongo and Webpack!</h2>
				</div>
			)
		}
	});

	return Header
});