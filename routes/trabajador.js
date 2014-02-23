var conex = require('./conexion.js')
var Trabajador = conex.Trabajador
var Empresa = conex.Empresa

exports.allTrabajador = function(req, res) {
	Trabajador.find({}, function(err, trabs){
		if (err) return handleError(err);
		var trabMap = {}
		var i = 0
		trabs.forEach(function(trab){
			Empresa.findById(trab.rEmp_id,'name',function(err, emp){
			if (err) return handleError(err);	
				if(emp) {
					trab.rEmp_id = JSON.stringify({id:emp._id, name: emp.name})
					trabMap[trab._id] = trab
					i++
					if(i == trabs.length) {					
						res.render('listTrabajadores', {trab: trabMap, title: 'Trabajadores'})	
					}
				}
				else
					res.render('404', {title: 'Hubo un error al consultar empresa de trabajador'})
			})
		})
	})
}
exports.createTrabajador = function(req, res) {
	var id = req.params.id
	Trabajador.findOne({ced:req.body.ced}, function(err, t){
		if (err) return handleError(err);
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
		if (err) return handleError(err);
		var o = (doc.state === true)? {$inc : {numEmpleados: +1}} : {$inc : {numEmpleados: -1}}
		Empresa.findByIdAndUpdate(doc.rEmp_id, o, function(err, doc){
			if (err) return handleError(err);
			res.send('exito')
		})	
	})
}
exports.viewTrabajador = function(req, res) {
	var id = req.params.id	
	Trabajador.findById(id, function(err, tra){
		if (err) return handleError(err);
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
		var stateOld = doc.state
		var empreOld = doc.rEmp_id
		if(err) return handleError(err);
		if(doc) {	
			Empresa.findByIdAndUpdate(doc.rEmp_id, {$inc : {numEmpleados: -1}}, function(err, doc){
				if (err) return handleError(err);
				if(doc) {
					Trabajador.findByIdAndUpdate(idTrab, { $set: req.body}, function(err, doc){
						if (err) return handleError(err);
						Empresa.findByIdAndUpdate(req.body.rEmp_id, {$inc : {numEmpleados : +1}}, function(err, doc){
							if (err) return handleError(err);
							if(req.body.state !== stateOld.toString()) {	
								var a = (req.body.state === 'true')? {$inc:{numEmpleados: +1}} : {$inc:{numEmpleados: -1}}
								Empresa.findByIdAndUpdate(req.body.rEmp_id, a, function(err, doc) {
									res.send('exito')
								})
							}
							else
								res.send('exito')						
						})	
					})
				}
				else res.render('404', {title: 'Esta Empresa no existe'})				
			})
		}
		else res.render('404', {title: 'Este Trabajador no existe'})
	})		
}
exports.showCreateTrabajador = function(req, res){		
	Empresa.findById(req.params.id, 'name', function(err, d){
		if (err) return handleError(err);
		if(d)
			res.render('createTrabajador',{title: 'Añadir Trabajador', nameEmpresa: d.name})
		else
			res.render('404', {title: 'Esta empresa no existe'})
	})
}
exports.formConsulta = function(req, res) {
	res.render('consulta', {title: 'Consulta'})
}
exports.consulta = function(req, res) {
	var ced = req.body.ced
	Trabajador.findOne({ced:ced}, function(err, t) {
		if(err) return handleError(err)
		if(t){
			Empresa.findById(t.rEmp_id, function(err, emp) {
				res.send({t:t,e:{name: emp.name, id: t.rEmp_id}})
			})
		}
		else
			res.send('no existe')
	})
}
function handleError(err) {
	console.log(err)
}