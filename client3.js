var net = require('net');
var ip = require('ip')
socket = new net.Socket()
socket.connect(8080,'10.80.5.150',function(){
	var ip1 = socket.address();
	console.log("ip in clients = ",ip1);
	socket.write(ip.address());
	//socket.write("name:ball")
	process.stdin.on('data',function(data){
		socket.write(ip.address()+':'+data);
	})
})

socket.on('data', function(data) { //
	var name='yui';
	var sendClient = data.toString().split(':',2);
	console.log("sendClient = ",sendClient);

	if(sendClient[0]===name) {
		console.log('server send to you : '+sendClient[1]);
	}
	if(sendClient[0]==="all") {
		console.log('server : '+sendClient[1]);
	}

})
