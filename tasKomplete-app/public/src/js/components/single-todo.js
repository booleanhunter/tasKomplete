define(['react','jquery'],function(React,$){
	var SingleTodo = React.createClass({
		getInitialState:function(){
			return {
				content:this.props.content,
				editing: false
			}			
		},
		myVar:{
			formSubmitted:false
		},
		handleChange: function(event){
			this.setState({
				content: event.currentTarget.value
			});	
		},
		componentWillReceiveProps:function(nextProps){
			this.setState({content:nextProps.content});
		},
		componentDidUpdate: function(){
			var node = React.findDOMNode(this.refs.editInput);
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		},	
		saveTodoOnSubmit:function(e){
			e.preventDefault();
			this.myVar.formSubmitted = true;
			this.props.saveTodo(this.props.todoId,e.target.children[0].value);
			this.setState({
				editing: false
			})
		},
		saveTodoOnBlur:function(e){
			if(this.myVar.formSubmitted){
				this.myVar.formSubmitted = false;
			}else{
				this.props.saveTodo(this.props.todoId,e.target.value);
			}
			e.preventDefault();
			this.setState({
				editing: false
			})
		},
		deleteTodo:function(){
			this.props.deleteTodo(this.props.todoId);
		},
		changeFinishStatus:function(event){
			if(event.target.checked){
				this.props.markAsFinished(this.props.todoId);
			}else{
				this.props.markAsActive(this.props.todoId);
			}
		},
		updateInputField: function(event) {
		    this.setState({content: event.target.value});
		},
		editTodo:function(event){
			this.setState({
				editing: true
			})
		},
		render:function(){
			var that = this;
			var itemClass = ""
			if(this.props.finishStatus){
				itemClass="completed"
			}

			if(this.state.editing){
				itemClass += " editing"
			}

			return (
				<li className={itemClass}>
				    <div className="view" >
				    	<input className="toggle" type="checkbox" checked={this.props.finishStatus} onChange={this.changeFinishStatus}/>
				    	<label onDoubleClick={that.editTodo} >{this.state.content}</label>
				    	<button className="destroy" onClick={that.deleteTodo} ></button>
				    </div>
				    <form onSubmit={this.saveTodoOnSubmit} className="inputClassOne">
				    	<input className="edit" value={this.state.content} onChange={that.handleChange} onBlur={that.saveTodoOnBlur} ref = "editInput" />
				    </form>
				</li>

			)			
		}
	});

	return SingleTodo;
});

/*
<div className="todos" onMouseEnter={that.showDeleteButton} onMouseLeave={that.hideDeleteButton}>
	<input type="checkbox" className="checkBox" checked={this.props.finishStatus} onChange={this.changeFinishStatus}/>

	<form onSubmit={this.saveTodoOnSubmit} className="inputClassOne">
		<input type="text" onChange={this.updateInputField} value={this.state.content} readOnly onDoubleClick={that.editTodo} onBlur={that.saveTodoOnBlur}/>						
	</form>
	<div style={this.state.deleteButtonStyle} onClick={that.deleteTodo}>X</div>
	<div>
		{this.props.date}
	</div>
</div>
*/