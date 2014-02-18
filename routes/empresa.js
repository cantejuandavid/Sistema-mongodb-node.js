var conex = require('./conexion.js')
var Empresa = conex.Empresa

exports.requestEmpresas = function(req, res){
	Empresa.find({}, function(err, emps){
		var empMap = {}
		emps.forEach(function(emp){
			empMap[emp._id] = emp
		})
		res.render('empresas', {emp: empMap, title: 'Empresas'})
	})
}
exports.createEmpresas = function(req, res){
	Empresa.findOne({name:req.body.name}, function(err, emp){
		if(!emp){
			var empresa = new Empresa(req.body)			
			empresa.save(function(err){
				if(!err)
					res.send('exitoso')
				else
					console.log(err)
			})
		}
		else
			res.send('error ya esta creada')
	})
}
exports.viewEmpresa = function(req, res){	

	var id = req.params.id
		
	Empresa.findById(id, function(err, emp){
		if(emp){				
			var Trabajador = conex.Trabajador		
			Trabajador.find({rEmp_id: emp._id}, function(err, trab){
				var trabMap = {}
				trab.forEach(function(t){
					trabMap[t._id] = t
				})								
				res.render('viewEmpresa',{emp: emp, title: emp.name, trab : trabMap})
			})
		}
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}
exports.listarEmpresas = function(req, res) {
	Empresa.find({},'id name', function(err, emps){
		var empMap = {}
		emps.forEach(function(empss){
			empMap[empss._id] = empss
		})
		res.send(empMap)				
	})	
}
exports.deleteEmpresa = function(req, res) {
	var id = req.params.id
	Empresa.findByIdAndUpdate(id, { $set: {state:false}}, function(err, doc){
		if(err)
			console.log(err)
		else
			res.send('exito')
	})
}
exports.editEmpresa = function(req, res) {
	var id = req.params.id
	Empresa.findById(id, '', function(err, doc) {
		if(doc)
			res.render('editEmpresa',{title: 'Editar - '+doc.name, emp: doc})
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}
exports.saveEmpresa = function(req, res) {
	var id = req.params.id	
	Empresa.findByIdAndUpdate(id, req.body, function(err, doc) {
		if(doc){
			res.send('saved')			
		}
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}