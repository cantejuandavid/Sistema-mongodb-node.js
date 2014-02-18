var Shema = require('mongoose').Schema

var usuario_Shema = new Shema({
	user_id: String,
	user: String,
	pass: String,
	name: String,
	ced: String,
	tipo: String,
	jefe: String,
	fCreation: { type: Date, default: Date.now }
})

var User = module.exports = usuario_Shema