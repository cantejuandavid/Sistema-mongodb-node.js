var conex = require('./conexion.js')
var Trabajador = conex.Trabajador
var Empresa = conex.Empresa

exports.allTrabajador = function(req, res) {
	Trabajador.find({}, function(err, trabs){
		var trabMap = {}
		var i = 0
		trabs.forEach(function(trab){
			Empresa.findById(trab.rEmp_id,'name',function(err, emp){								
				trab.rEmp_id = JSON.stringify({id:emp._id, name: emp.name})
				trabMap[trab._id] = trab
				i++
				if(i == trabs.length) {					
					res.render('listTrabajadores', {trab: trabMap, title: 'Trabajadores'})	
				}
			})
		})
	})
}
exports.createTrabajador = function(req, res) {
	var id = req.params.id
	Trabajador.findOne({ced:req.body.ced}, function(err, t){
		if(!t){			
			req.body.rEmp_id = id				
			var employee = new Trabajador(req.body)
			
				employee.save(function(err){
					if(!err){
						Empresa.findByIdAndUpdate(id, {$inc : {numEmpleados : +1}}, function(err, doc){							
						})						
						res.send('o')
					}
					else
						console.log(err)
				})				
		}
		else
			res.send('e')
	})
}
exports.deleteTrabajador = function(req, res) {	
	var id = req.params.id
	Trabajador.findByIdAndUpdate(id, { $set: {state:req.body.state}}, function(err, doc){
		if(err)
			console.log(err)
		else			
			res.send('exito')
	})
}
exports.viewTrabajador = function(req, res) {
	var id = req.params.id	
	Trabajador.findById(id, function(err, tra){		
		if(tra) {
			Empresa.findById(tra.rEmp_id,'name', function(err, emp){
				tra.rEmp_id = JSON.stringify({id:emp._id, name: emp.name})
				res.render('viewTrabajador', {trab: tra})			
			})
		}
		else
			res.send('no exite usuario')		
	})	
}
exports.saveTrabajador = function(req, res) {
	var idTrab = req.params.id

	Trabajador.findById(idTrab, function(err, doc) {	
		if(doc) {
			Empresa.findByIdAndUpdate(doc.rEmp_id, {$inc : {numEmpleados: -1}}, function(err, doc){
				if(doc) {
					Trabajador.findByIdAndUpdate(idTrab, { $set: req.body}, function(err, doc){
						if(!err) {
							Empresa.findByIdAndUpdate(req.body.rEmp_id, {$inc : {numEmpleados : +1}}, function(err, doc){
								res.send('exito')
							})
						}
						else
							console.log(err)		
					})
				}
				else
					res.render('404', {title: 'Esta Empresa no existe'})				
			})
		}
		else
			res.render('404', {title: 'Este Trabajador no existe'})
		
	})		
}
exports.showCreateTrabajador = function(req, res){		
	Empresa.findById(req.params.id, 'name', function(e, d){
		if(d)
			res.render('createTrabajador',{title: 'Añadir Trabajador', nameEmpresa: d.name})
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}