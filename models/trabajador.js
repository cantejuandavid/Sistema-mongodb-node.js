var Shema = require('mongoose').Schema

var trabajador_Shema = new Shema({
	id: String,
	ced: Number,
	first_name: String,
	last_name: String,
	rEmp_id: String,
	state: { type: Boolean, default: true },
	phone: Number,
	address: String,
	fCreation: { type: Date, default: Date.now }
})

var Trabajador = module.exports = trabajador_Shema