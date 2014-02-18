var Shema = require('mongoose').Schema

var empresa_Shema = new Shema({
	id: String,
	nit: String,
	name: String,
	numEmpleados: { type: Number, default: 0 },
	state: { type: Boolean, default: true },
	phone: Number,
	address: String,
	email: String,
	fCreation: { type: Date, default: Date.now },
	userNom: String,
	passNom: String,
	userEps: String,
	passEps: String,
	userArl: String,
	passArl: String
})

var Empresa = module.exports = empresa_Shema