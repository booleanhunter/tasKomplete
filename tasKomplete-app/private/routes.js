define(['./db-api','exports','passport','passport-local'],function(dbApi,exports,passport,localStrategy){
	exports.initialize = function(expressApp){
		console.log('inside routes');
		var app = expressApp;

		//passport configurations
		app.use(passport.initialize());
		app.use(passport.session());

		passport.serializeUser(function(user, done) {
		  	done(null, user);
		});

		passport.deserializeUser(function(user, done) {
		  	done(null, user);
		});

		passport.use(new localStrategy({
				passReqToCallback : true
			},
    	  	function(req, username, password,done) {
	    	  	dbApi.checkForUser(username,function(err, user) {
	    	      	if(err){
	    	      		return done(err);

	    	      	}if (!user) {
		    	        return done(null, false);		    	    
		    	    }else{
		    	    	return done(null, user);
		    	    }
		    	    
	    	    });
	    	}
	    ));

	    function passportAuthenticate(req,res,next){
	    	passport.authenticate('local', function(err, user, info) {
		  		console.log(user);
			    if (err){ 
			    	return next(err);

			   	}if(!user){
			   		return res.send({
			   			status:'authentication failure'
			   		});

			   	}else{
			   		if(user.password === req.body.password){
	   				   	req.logIn(user, function(err){
	   				      	if (err) {
	   				      		return next(err); 
	   				      	}
	   			      		res.send({
	   			   				status:'authenticated'
	   			   			});
	   				    });
	   				}else{
	   					res.send({
	   						status:'password failure'
	   					})
	   				}				   	
				}    
		  	})(req, res, next);
	    }

	    //initializing routes
		
		app.get('/',function(req,res){
		    console.log('request to /');
			if(req.user !== undefined){
				console.log(req.user);
				res.render('index',{name:req.user.username});
			}
			else{
				res.render('index',{name:null});
			}
		});

		app.post('/checkforuser',function(req,res){
			dbApi.checkForUser(req.body.username,function(err, docs){
				if(err){
					res.send({
						status:'Error'
					});
				}else{
					if(docs){
						res.send({
							status:'exists'
						});						
					}else{
						res.send({
							status:'available'
						});
					}
				}
			});
		});

		app.post('/signup',function(req,res,next){
			dbApi.registerNewUser(req,function(err,docs){
				if(err){
					res.send({
						status:'Error in registering user'
					});
				}else{
					if(docs.length > 0){
					  	passportAuthenticate(req,res,next);
					}				
				}
			});
		});
		app.post('/authenticate', function(req, res, next) {
		  	passportAuthenticate(req,res,next);
		});

		app.get('/logout',function(req,res){
			req.logOut();
			res.redirect('/');
		});

		app.get('/fetchalltodos',function(req,res){
			console.log('request to /fetchalltodos');
			dbApi.fetchAllTodos(req,function(err,docs){
				if(err){
					res.send({
						status: 'Error in fetching todos'
					});
				}else{
					console.log(docs);
					if(docs.length > 0){
						res.send({
							allTodos: docs
						});
					}else{
						res.send({
							allTodos: []
						});
					}
				}
			});
		});

		app.get('/fetchnotifications',function(req,res){
			console.log('request to /fetchnotifications');
			dbApi.fetchNotifications(req,function(err,docs){
				if(err){
					res.send({
						status:'Error in fetching notifications'
					});
				}else{
					console.log(docs);
					if(docs.length > 0){
						res.send({
							notifications: docs
						})
					}else{
						res.send({
							notifications: []
						})
					}
				}
			});
		})

		app.post('/createnewtodo',function(req,res){
			console.log('request to /createnewtodo');
			dbApi.createNewTodo(req,function(err,docs){
				if(err){
					res.send({
						status: 'Error in creating new todo'
					});
				}else{
					if(docs.length > 0){
						res.send({
							status: 'New Todo created'
						});
					}
				}
			});
		});

		app.post('/savetodo',function(req,res){
			console.log('request to /savetodo');
			if(req.user.username){
				dbApi.saveTodo(req,function(err,docs){
					if(err){
						res.send({
							status: 'Error in saving todo'
						});
					}else{
						res.send({
							status: 'Todo is saved',
							docs: docs
						});
					}
				});
			}			
		});

		app.post('/deletetodo',function(req,res){
			console.log('request to /deletetodo');
			if(req.user.username){
				dbApi.deleteTodo(req,function(err,docs){
					if(err){
						res.send({
							status: 'Error in deleting todo'
						});
					}else{
						res.send({
							status: 'Todo is deleted',
							docs: docs
						});
					}
				});
			}			
		});

		app.post('/markasfinished',function(req,res){
			console.log('request to /markasfinished');
			if(req.user.username){
				dbApi.markAsFinished(req,function(err,docs){
					if(err){
						res.send({
							status: 'Error in archiving todo'
						});
					}else{
						res.send({
							status: 'Todo is finished',
							docs: docs
						});
					}
				});
			}			
		});

		app.post('/markasactive',function(req,res){
			console.log('request to /markasactive');
			if(req.user.username){
				dbApi.markAsActive(req,function(err,docs){
					if(err){
						res.send({
							status: 'Error in archiving todo'
						});
					}else{
						res.send({
							status: 'Todo is activated',
							docs: docs
						});
					}
				});
			}			
		});

		app.post('/assigntodo',function(req,res){
			console.log('request to /assigntodo');
			if(req.user.username){				
				dbApi.checkForUser(req.body.assignTo,function(err,docs){
					if(err){
						res.send({
							status:'invalid'
						});					
					}else{
						dbApi.assignTodo(req,function(err,docs){
							if(err){
								res.send({
									status:err
								});
							}else{
								res.send({
									status:'valid'
								});
							}
						});
					}
				});
			}
		});

	}	

})