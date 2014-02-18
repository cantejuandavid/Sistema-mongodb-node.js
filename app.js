
var express = require('express');
var routes = require('./routes');
var Empresa = require('./routes/empresa'),
	Trabajador = require('./routes/trabajador');
var http = require('http');
var path = require('path');
var nib = require('nib');
var stylus = require('stylus');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {
	res.status(404);
	res.render('404.jade', {title: '404: Archivo no encontrado'});
});
app.use(stylus.middleware(__dirname + '/public'));
function compile(str, path, fn) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib())		
}

app.use(function(error, req, res, next) {
	res.status(500);
	res.render('404.jade', {title:'500: Internal Server Error', error: error});
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Servidor escuchando en puerto ' + app.get('port'));
});
var clients = [];
var io = require('socket.io').listen(server, {log: false});


app.get('/', routes.index)

app.get('/empresas', Empresa.requestEmpresas)
app.get('/empresas/create', function(req, res){res.render('createEmpresas')})
app.get('/empresas/:id', Empresa.viewEmpresa)
app.get('/empresas/:id/delete', Empresa.deleteEmpresa)

app.get('/empresas/:id/createTrabajador', Trabajador.showCreateTrabajador)
app.post('/empresas/:id/createTrabajador', Trabajador.createTrabajador)
app.get('/empresas/:id/edit', Empresa.editEmpresa)
app.post('/empresas/create', Empresa.createEmpresas)
app.post('/empresas/:id/save', Empresa.saveEmpresa)
app.get('/trabajador/:id', Trabajador.viewTrabajador)
app.post('/trabajador/:id/save', Trabajador.saveTrabajador)
app.post('/trabajador/:id/delete', Trabajador.deleteTrabajador)
app.get('/trabajador', Trabajador.allTrabajador)
app.post('/empresas/:id/delete', Empresa.deleteEmpresa)
app.post('/trabajador/:id/listarEmpresas', Empresa.listarEmpresas)

app.post('/', routes.login)

app.get('/createUser', function(req,res){res.render('createUser')})
app.post('/createUser', routes.registro)

