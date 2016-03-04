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
				document.getElementById('allTodos').style.display = 'block';
				document.getElementById('activeTodos').style.display = 'none';
				document.getElementById('completedTodos').style.display = 'none';
			},
			showActiveTodos:function(){
				document.getElementById('allTodos').style.display = 'none';
				document.getElementById('activeTodos').style.display = 'block';
				document.getElementById('completedTodos').style.display = 'none';
			},
			showCompletedTodos:function(){
				document.getElementById('allTodos').style.display = 'none';
				document.getElementById('activeTodos').style.display = 'none';
				document.getElementById('completedTodos').style.display = 'block';
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
					<div id="todoList" className="todoapp">
						<div className="tabs">
						    <ul className = "tabs-headers">
						        <li id="allTodosHeader" className="buttonClassOne items" onClick={this.showAllTodos}>
						        	All Todos
						        </li>
						        <li id="activeTodosHeader" className="buttonClassOne items" onClick={this.showActiveTodos}>
						        	Active
						        </li>
						        <li id="completedTodosHeader" className="buttonClassOne items" onClick={this.showCompletedTodos}>
						        	Completed
						        </li>
						    </ul>
						</div>	

						<div id="tabsContent">
							<div id="allTodos">{allTodos}</div>
							<div id="activeTodos" style={this.state.todoContentStyle}> {activeTodos}</div>
							<div id="completedTodos" style={this.state.todoContentStyle}> {completedTodos}</div>						
						</div>	

					</div>				
				)
			}
		});
		return TodoList;
	}
)