//fazer conexao
var socket = io.connect('192.168.0.34:8080'); // socket do front end

var mensagem = document.getElementById('mensagem'),
	usuario = document.getElementById('usuario'),
	botao = document.getElementById('enviar'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

//Emitir eventos
botao.addEventListener('click', function(){
	socket.emit('chat', {
		mensagem: mensagem.value,
		usuario: usuario.value
	});
	mensagem.value = '';
});

mensagem.addEventListener('keypress', function(){
	socket.emit('typing', usuario.value);
});

//Escutar eventos
socket.on('chat', function(data){
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>'+data.usuario + ':</strong>'+data.mensagem+'</p>';
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>'+data+' está escrevendo uma mensagem...</em></p>';
});