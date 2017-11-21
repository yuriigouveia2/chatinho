var express = require('express');
var socket = require('socket.io');

//Config da aplicação
var app = express();
var server = app.listen(8080, function(){
	console.log('servidor rodando na porta 8080');
});//Porta a qual o servidor irá escutar

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('conexao do socket criada', socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data); //ira emitir quem esta digitando para todos os clientes, exceto o proprio
	});	
});


