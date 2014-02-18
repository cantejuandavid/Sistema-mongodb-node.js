var mongoose = require('mongoose');
	var db = mongoose.createConnection('mongodb://localhost/asopagos')
	db.on('error', console.log.bind(console, 'Error de conexión:'))
	db.once('connected', function callback () {
	    console.log('¡Conectado a mongodb!')
	})
	db.once('open', function callback () {
	    console.log('¡ON! Conectado con la DB Asopagos.')
	})

	var usuario_Shema = require('../models/usuario'),
		empresa_Shema = require('../models/empresa'),
		trabajador_Shema = require('../models/trabajador')

exports.User = db.model('User', usuario_Shema);
exports.Empresa = db.model('Empresa', empresa_Shema)
exports.Trabajador = db.model('Trabajador', trabajador_Shema)