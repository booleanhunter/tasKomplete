define(
	[
		'react',
		'jquery',
		'avgrund'
	],
	function(React,$, avgrund){
		
		var TaskPopup = React.createClass({
			getInitialState: function(){
                return {
                    Avgrund: avgrund.Avgrund()
                }
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
					    	that.props.fetchAllTodos();          
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
						type: 'POST',
						url: '/assigntodo',
						datatype:' json',
						data: postData,
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
			showTaskPopup: function(){
				this.state.Avgrund.show("#task-popup");
			},
			hideTaskPopup: function(){
				this.state.Avgrund.hide();
			},
			componentDidMount: function(){
				this.state.Avgrund.show("#task-popup");
			},
			componentWillReceiveProps: function(){
				this.state.Avgrund.show("#task-popup");
			},
			render: function(){
				var style = {
					fontSize:"200%"
				};
				return (
					<div id="task-popup" className="avgrund-popup">
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
	 		     	</div>
				)
			}
		});

		return TaskPopup
	}
);