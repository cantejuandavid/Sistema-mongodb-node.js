var mongoose = require('mongoose');
	//mongodb://asopagos:thomas2020@ds027509.mongolab.com:27509/asopagos
	var dbURI = 'mongodb://localhost/asopagos'
	mongoose.connect(dbURI)
	var db = mongoose.connection

	db.on('error', console.log.bind(console, 'Error de conexión:'))
	db.once('open', function callback () {
	    console.log('¡ON! Conectado con la DB Asopagos.')
	})
	
	var usuario_Shema = require('../models/usuario'),
		empresa_Shema = require('../models/empresa'),
		trabajador_Shema = require('../models/trabajador')

exports.User = db.model('User', usuario_Shema);
exports.Empresa = db.model('Empresa', empresa_Shema)
exports.Trabajador = db.model('Trabajador', trabajador_Shema)