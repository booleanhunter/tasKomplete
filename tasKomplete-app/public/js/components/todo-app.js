define(
	[
		'react', 
		'jquery', 
		'./header', 
		'./todo-list'
	],function(React, $, Header, TodoList){
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
				    	that.refs.TodoList.fetchAllTodos();          
				    },
				    error: function(httpRequest,status,error){
				    	console.log(error)
				    }
				});
			}			
			e.preventDefault();
		},		
		assignTodo: function(){
			var assigneeInput = document.getElementById('assigneeInput'),
				assignTodoInput = document.getElementById('assignTodoInput'),
				that = this;

			if(assigneeInput.value !== '' && assignTodoInput.value !== ''){
				var postData = {
					assignTo: assigneeInput.value,
					todoContent: assignTodoInput.value
				};
				$.ajax({
					type:'POST',
					url:'/assigntodo',
					datatype:'json',
					data:postData,
					success: function(data){
						if(data.status === 'invalid'){
							assigneeInput.setAttribute('placeholder','The username does not belong to any account');
							assigneeInput.className = 'error';
						}else{
							assigneeInput.setAttribute('placeholder','Assign a todo to another user. Enter the username');
							assigneeInput.className = '';
						}
					},
					error: function(httpRequest,status,error){
						console.log(error);
					}
				});
			}else{
				if(assigneeInput.value === ''){
					assigneeInput.setAttribute('placeholder','You must enter a valid username');
					assigneeInput.className = 'error';
				}
				if(assignTodoInput.value === ''){
					assignTodoInput.setAttribute('placeholder','Please enter the content');
					assignTodoInput.className = 'error';
				}
			}			
			console.log(assigneeInput);
			console.log(assignTodoInput);
		},
		render:function(){
			var style = {
				fontSize:"200%"
			};
			return (
				<div id="todoApp">
					<Header />
					<h3 id="username">Welcome, {this.props.username} </h3>
					<div id="logoutButton">
						<a href="/logout"> Logout </a>
					</div>	

					<div id="main" className="section group">
			     		<div className="column todoInputSection">
     						<form onSubmit={this.createNewTodo} className="inputClassOne">
     			  				<input type="text" id="inputTodo" placeholder="Enter a todo" />
     					    </form>

     					    <label><input style={style} type="checkbox" className="switch" checked/>Tools</label>
				     	</div>

	     	     		<div className="column todoInputSection">
	     	     			<div className="assignTodoSection inputClassOne">
	     	     			    <input type="text" id="assigneeInput" placeholder="Assign a todo to another user. Enter the username" />
	     	     			    <div id="assigneeInputErr"></div>
	     	     			    <input type="text" id="assignTodoInput" placeholder="Enter the todo to assign to a user" />
	     	     			    <div id="assignTodoErr"></div>
	     	     			    <input type="button" id="assignTodoSubmit" onClick={this.assignTodo} value="Assign"/>
	     	     			</div>
	     		     	</div>
	     		     	<br />

	     		     	<TodoList ref="TodoList"/>

	     		     	<div id="bgImg"></div>
	     		     	<div className="overlay"></div>

					</div>
					{/*
					<form onSubmit={this.createNewTodo} className="pure-form">
		  				<input type="text" id="inputTodo" placeholder="Enter a todo" />
				    </form>

				    <div className="assignTodoSection pure-form">
				        <input type="text" id="assigneeInput" placeholder="Assign a todo to another user. Enter the username" />
				        <div id="assigneeInputErr"></div>
				        <input type="text" id="assignTodoInput" placeholder="Enter the todo to assign to a user" />
				        <div id="assignTodoErr"></div>
				        <input type="button" id="assignTodoSubmit" className="pure-button" onClick={this.assignTodo} value="Assign"/>
				    </div>
					<TodoList ref="TodoList"/> */}
					
					
				</div>
			)	
		}
	});

	return TodoApp;

	}
);		