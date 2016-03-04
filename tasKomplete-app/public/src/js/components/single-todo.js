define(['react','jquery'],function(React,$){
	var SingleTodo = React.createClass({
		getInitialState:function(){
			return {
				deleteButtonStyle:{
					display:'none',
					float:'right'
				},
				content:this.props.content		
			}			
		},
		myVar:{
			formSubmitted:false
		},
		componentWillReceiveProps:function(nextProps){
			this.setState({content:nextProps.content});
		},			
		saveTodoOnSubmit:function(e){
			e.target.children[0].readOnly = true;
			e.preventDefault();
			this.myVar.formSubmitted = true;
			this.props.saveTodo(this.props.todoId,e.target.children[0].value);
		},
		saveTodoOnBlur:function(e){
			if(this.myVar.formSubmitted){
				this.myVar.formSubmitted = false;
			}else{
				e.target.readOnly = true;
				this.props.saveTodo(this.props.todoId,e.target.value);
			}
			e.preventDefault();
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
			event.target.readOnly = false;
		},
		showDeleteButton:function(event){
			event.currentTarget.children[2].style.display = 'block';
		},
		hideDeleteButton:function(event){
			event.currentTarget.children[2].style.display = 'none';
		},
		render:function(){
			var that = this;
			var itemClass = ""
			if(this.props.finishStatus){
				itemClass="completed"
			}

			return (
				<li className={itemClass}>
				    <div className="view" >
				    	<input className="toggle" type="checkbox" checked={this.props.finishStatus} onChange={this.changeFinishStatus}/>
				    	<label>{this.state.content}</label>
				    	<button className="destroy" onClick={that.deleteTodo}></button>
				    </div>
				    <input className="edit" value={this.state.content} readOnly onDoubleClick={that.editTodo} onBlur={that.saveTodoOnBlur}/>
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