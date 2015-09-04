define(
	[
		'react', 
		'jquery', 
		'./header', 
		'./todo-list',
		'./task-popup'
	],function(React, $, Header, TodoList, TaskPopup){
	var TodoApp = React.createClass({
		componentDidMount: function(){
			this.fetchNotifications();	
		},
		fetchNotifications: function(){
			$.ajax({
				type:'GET',
				url:'/notifications',
				datatype:'json',
				success:function(data){
					console.log(data);
				},
				error:function(httpRequest,status,error){
					console.log(error);
				}
			});
		},
		fetchAllTodos: function(){
			this.refs.TodoList.fetchAllTodos();
		},
		showTaskPopup: function(){
			React.render(<TaskPopup 
				fetchAllTodos={this.fetchAllTodos} 
				fetchAllTodos={this.fetchAllTodos} />, document.getElementById('popup-container'));
		},	
		render:function(){
			return (
				<div id="todoApp">
					<Header userName={this.props.userName}/>
					<div id="main" className="section group">
						<div id="task-button" className = "buttonClassOne" onClick={this.showTaskPopup}>
							Enter a Task
						</div>	
	     		     	<br />

	     		     	<TodoList ref="TodoList"/>

	     		     	<div id="bgImg"></div>
	     		     	<div className="overlay"></div>

					</div>
				</div>
			)	
		}
	});

	return TodoApp;

	}
);		