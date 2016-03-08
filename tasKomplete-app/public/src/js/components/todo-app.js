/**
 * @author booleanhunter
 * @about Logic for Rendering the task page and header
 */

define(
	[
		'react', 
		'./header', 
		'./todo-list'
	],
	function(React, Header, TodoList){

		var TodoApp = React.createClass({
			fetchAllTodos: function(){
				this.refs.TodoList.fetchAllTodos();
			},
			render:function(){
				return (
					<div id="todoApp">
						<Header username={this.props.username}/>	
						<div id="contentWrapper">
			     		  	<TodoList ref="TodoList"/>  
			     		</div>

						<div id="bgImg"></div>
			     		<div className="overlay"></div>
					</div>
				)	
			}
		});

		return TodoApp;
	}
);		