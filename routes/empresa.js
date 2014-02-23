var requi = require('./conexion.js')
var Empresa = requi.Empresa

exports.requestEmpresas = function(req, res){
	Empresa.find({}, function(err, emps){
		if (err) return handleError(err)
		var empMap = {}
		emps.forEach(function(emp){
			empMap[emp._id] = emp
		})
		res.render('empresas', {emp: empMap, title: 'Empresas'})
	})
}
exports.createEmpresas = function(req, res){
	Empresa.findOne({name:req.body.name}, function(err, emp){
		if (err) return handleError(err);
		if(!emp){			
			var empresa = new Empresa(req.body)			
			empresa.save(function(err){
				if (err) return handleError(err);
				res.send('exitoso')
			})
		}
		else
			res.send('error ya esta creada')
	})
}
exports.viewEmpresa = function(req, res){	
	var id = req.params.id
	Empresa.findById(id, function(err, emp){
		if (err) return handleError(err);
		if(emp){				
			var Trabajador = requi.Trabajador		
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
		if (err) return handleError(err);
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
		if (err) return handleError(err);
		res.send('exito')
	})
}
exports.showEditEmpresa = function(req, res) {
	var id = req.params.id
	Empresa.findById(id, function(err, doc) {
		if (err) return handleError(err);
		if (doc)
			res.render('editEmpresa',{title: 'Editar - ' + doc.name, emp: doc})
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}
exports.saveEmpresa = function(req, res) {
	var id = req.params.id
	Empresa.findByIdAndUpdate(id, req.body, function(err, doc) {
		if (err) return handleError(err);
		if(doc)
			res.send('saved')
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}
function handleError(err) {
	console.log(err)
}