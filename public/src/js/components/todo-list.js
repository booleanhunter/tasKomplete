/**
 * @author booleanhunter
 * @about Logic for Rendering the todo list, and AJAX requests for fetching, saving, retrieving, completing, editing and deleting todos
 */

define(
	[
		'react',
		'./todo-item',
		'../common-functions'
	],
	function(React, TodoItem, commonFunctions){ 
		var TodoList = React.createClass({
			getInitialState:function(){
				return {
					allTodos:[],
					activeTodos:[],
					completedTodos:[],
					todosToDisplay: 'all'
				}
			},
			componentDidMount:function(){
				this.fetchAllTodos();	
			},		
			createNewTodo: function(e){
				var inputTodo = document.getElementById('inputTodo'),
					that = this;
				if(inputTodo.value !== ''){
					var postData = {
						todoContent : inputTodo.value
					};

					var successCallback = function(data){
						inputTodo.value = '';
						that.fetchAllTodos();
					};

					commonFunctions.sendHTTPPostRequest('/todos', postData, successCallback);
				}			
				e.preventDefault();
			},
			fetchAllTodos:function(){
				var successCallback = function(data){
			    	var allTodos = [], activeTodos = [], completedTodos = [], archivedTodos = [];
			    	for (var i=0; i < data.allTodos.length; i++){
		    			allTodos.push(data.allTodos[i]);
		    			if(data.allTodos[i].finishStatus === false) {
		    			    activeTodos.push(data.allTodos[i]);
		    			}else if(data.allTodos[i].finishStatus === true){
		    				completedTodos.push(data.allTodos[i]);
		    			}			    	    
			    	}
			    	this.setState({allTodos:allTodos,activeTodos:activeTodos,completedTodos:completedTodos});
				}.bind(this);

				commonFunctions.sendHTTPGetRequest('/todos', successCallback);
			},	
			saveTodo:function(todoId,todoContent){
				var postData = {
					todoId: todoId,
					todoContent: todoContent
				};

				var successCallback = function(data){
					this.fetchAllTodos();
				}.bind(this);

				commonFunctions.sendHTTPPostRequest('/todo/update', postData, successCallback);
			},
			deleteTodo:function(todoId){
				var postData = {
					todoId: todoId
				};

				var successCallback = function(data){
					this.fetchAllTodos();
				}.bind(this);

				commonFunctions.sendHTTPPostRequest('/todo/delete', postData, successCallback);
			},
			markAsFinished: function(todoId){
				var postData = {
					todoId: todoId
				};

				var successCallback = function(data){
					this.fetchAllTodos();
				}.bind(this);

				commonFunctions.sendHTTPPostRequest('/todo/mark_complete', postData, successCallback);
			},
			markAsActive: function(todoId){
				var postData = {
					todoId: todoId
				};

				var successCallback = function(data){
					this.fetchAllTodos();
				}.bind(this);

				commonFunctions.sendHTTPPostRequest('/todo/mark_incomplete', postData, successCallback);
			},
			showTodos:function(todosToDisplay,elementId){
				this.setState({
					todosToDisplay: todosToDisplay
				});	
			},
			componentDidUpdate: function(argument) {
				var selectedElements = document.getElementsByClassName("selected");

				for(var i=0; i < selectedElements.length; i++){
					selectedElements[i].className = selectedElements[i].className.replace(/selected/g,'');
				};
				console.log(this.state.todosToDisplay)
				switch(this.state.todosToDisplay){
					case 'all':
						document.getElementById('allTodosHeader').className += " selected";;
						break;
					case 'active':
						document.getElementById('activeTodosHeader').className += " selected";;
						break;
					case 'completed':
						document.getElementById('completedTodosHeader').className += " selected";
						break;
				}	
			},
			render:function(){
				console.log('rendered')
				var that = this, todos; 
				switch(this.state.todosToDisplay){
					case 'all':
						todos = that.state.allTodos;
						break;
					case 'active':
						todos = that.state.activeTodos;
						break;
					case 'completed':
						todos = that.state.completedTodos;
						break;
				}

				var todoComponents = todos.map(function(todo){
					return (
						<TodoItem 
							key={"all"+todo._id} 
							todoId={todo._id}
							content={todo.content} 
							finishStatus={todo.finishStatus} 
							archived={todo.archived} 
							date={todo.date} 
							deleteTodo={that.deleteTodo}
							saveTodo={that.saveTodo}  
							markAsFinished={that.markAsFinished} 
							markAsActive={that.markAsActive} />
					)	
				});
				/*Implicit form submission is being perfomed here. If there is no submit button, then the form gets submitted but only if there
					is one input field. Else, you must have a submit button.
				*/
				return (
					<div className="todoapp">
						<div>
						    <header>
							    <h1>
							    	tasKomplete
							    </h1>
							    <form onSubmit={this.createNewTodo} >
							    <input className="new-todo" id="inputTodo" placeholder="What needs to be done?" />
							    </form>
						    </header>
						    <section className="main" >
						    	<input className="toggle-all" type="checkbox" />
						        <ul className="todo-list" >
						        	{todoComponents}
						        </ul>
						    </section>
						    <footer className="footer">
						    	<span className="todo-count">
						    		<strong>{this.state.activeTodos.length}</strong>
						    		<span> </span>
						    		<span> items </span>
						    		<span> left </span>
						    	</span>
						        <ul className="filters">
						            <li>
						            	<a href="#" id="allTodosHeader" onClick={this.showTodos.bind(this,'all','allTodosHeader')} >
						            		All
						            	</a>
						            </li>
						            <span> </span>
						            <li>
						            	<a href="#" id="activeTodosHeader" onClick={this.showTodos.bind(this,'active','activeTodosHeader')}>
						            		Active
						            	</a>
						            </li>
						            <span> </span>
						            <li>
						            	<a href="#" id="completedTodosHeader" onClick={this.showTodos.bind(this,'completed','completedTodosHeader')}>
						            		Completed
						            	</a>
						            </li>
						        </ul>
						    </footer>
						</div>
					</div>
				)
			}
		});

		return TodoList;
	}
)