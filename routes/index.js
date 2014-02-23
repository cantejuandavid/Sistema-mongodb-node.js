var requi = require('./conexion.js')
var User = requi.User

exports.index = function(req, res){
  res.render('index.jade', {title: 'Iniciar Sesión' });  
}
function encript(user, pass){
	var crypto = require('crypto'),
		q = crypto.createHmac('sha1', user).update(pass).digest('hex')
	return q
}

exports.login = function(req, res){
	var userQ = req.body.user,
		param = req.body.param,
		passQ = req.body.pass,
		pCrypto;	
		pCrypto = encript(userQ,passQ);
		User.findOne({user:userQ},function (err, user){
			if(user){
				if(user.pass === pCrypto)				
					res.render('index',{ user: {name:user.name,tipo:user.tipo,user:user.user}})
				else
					res.render('index',{error:'error'})
			}	
			else
				res.render('index',{error:'error'})
		})
}
exports.registro = function(req, res){
	var userQ = req.body.user,
		passQ = req.body.pass
	User.findOne({user:userQ},function(err, user){
		if(!user){
			req.body.pass = encript(userQ, passQ)
			var user = new User(req.body)
		    user.save(function(err) {
				if (!err)
			        res.send('registro')
				else
					console.log(err)			
			})
		}
		else
			res.send('existe')
	})
}