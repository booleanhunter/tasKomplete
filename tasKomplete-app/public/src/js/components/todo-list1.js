define(
	[
		'react',
		'jquery',
		'./single-todo'
	],
	function(React,$,SingleTodo){ 
		var TodoList = React.createClass({
			getInitialState:function(){
				return {
					allTodos:[],
					activeTodos:[],
					completedTodos:[],
					todoContentStyle:{
						display:'none'
					}
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
					$.ajax({
					    type:'POST',
					    url:'/todos',
					    datatype:'json',
					    data:postData,
					    success: function(data){
					    	inputTodo.value = '';
					    	that.fetchAllTodos();          
					    },
					    error: function(httpRequest,status,error){
					    	console.log(error)
					    }
					});
				}			
				e.preventDefault();
			},
			fetchAllTodos:function(){
				$.ajax({
				    type:'GET',
				    url:'/todos',
				    datatype:'json',
				    success: function(data){
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
				    }.bind(this),
				    error: function(httpRequest,status,error){
				    	console.log(error)
				    }
				});
			},	
			saveTodo:function(todoId,todoContent){
				var postData = {
					todoId: todoId,
					todoContent: todoContent
				},
				that = this;
				$.ajax({
				    type:'POST',
				    url:'/todo/update',
				    datatype:'json',
				    data:postData,
				    success: function(data){
				    	that.fetchAllTodos();           
				    },
				    error: function(httpRequest,status,error){
				    	console.log(error)
				    }
				});
			},
			deleteTodo:function(todoId){
				var postData = {
					todoId: todoId
				},
				that = this;
				$.ajax({
				    type:'POST',
				    url:'/todo/delete',
				    datatype:'json',
				    data:postData,
				    success: function(data){
				    	that.fetchAllTodos();           
				    },
				    error: function(httpRequest,status,error){
				    	console.log(error)
				    }
				});
			},
			markAsFinished: function(todoId){
				var postData = {
					todoId: todoId
				},
				that = this;
				$.ajax({
				    type:'POST',
				    url:'/todo/mark_complete',
				    datatype:'json',
				    data:postData,
				    success: function(data){
				    	that.fetchAllTodos();           
				    },
				    error: function(httpRequest,status,error){
				    	console.log(error)
				    }
				});
			},
			markAsActive: function(todoId){
				var postData = {
					todoId: todoId
				},
				that = this;
				$.ajax({
				    type:'POST',
				    url:'/todo/mark_incomplete',
				    datatype:'json',
				    data:postData,
				    success: function(data){
				    	that.fetchAllTodos();           
				    },
				    error: function(httpRequest,status,error){
				    	console.log(error)
				    }
				});
			},
			
			showAllTodos:function(){
				document.getElementById('allTodosHeader').className = "selected";
				document.getElementById('activeTodosHeader').className = '';
				document.getElementById('completedTodosHeader').className = '';
			},
			showActiveTodos:function(){

				document.getElementById('allTodosHeader').className = '';
				document.getElementById('activeTodosHeader').className = 'selected';
				document.getElementById('completedTodosHeader').className = '';
			},
			showCompletedTodos:function(){
				document.getElementById('allTodosHeader').className = '';
				document.getElementById('activeTodosHeader').className = '';
				document.getElementById('completedTodosHeader').className = 'selected';
			},
			render:function(){
				var that = this;
				var allTodos = this.state.allTodos.map(function(todo){
					return (
						<SingleTodo 
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
				var activeTodos = this.state.activeTodos.map(function(todo){
					return (
						<SingleTodo 
							key={todo._id} 
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

				var completedTodos = this.state.completedTodos.map(function(todo){
					return (
						<SingleTodo 
							key={todo._id}  
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
							    	todos
							    </h1>
							    <form onSubmit={this.createNewTodo} >
							    <input className="new-todo" id="inputTodo" placeholder="What needs to be done?" />
							    </form>
						    </header>
						    <section className="main" >
						    	<input className="toggle-all" type="checkbox" />
						        <ul className="todo-list" >
						        	{allTodos}
						        </ul>
						    </section>
						    <footer className="footer">
						    	<span className="todo-count">
						    		<strong >2</strong>
						    		<span></span>
						    		<span>items</span>
						    		<span>left</span>
						    	</span>
						        <ul className="filters">
						            <li><a href="#" id="allTodosHeader" onClick={this.showAllTodos} className="selected">All</a></li><span > </span>
						            <li><a href="#" id="activeTodosHeader" onClick={this.showActiveTodos} className="">Active</a></li><span> </span>
						            <li><a href="#" id="completedTodosHeader" onClick={this.showCompletedTodos} className="">Completed</a></li>
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