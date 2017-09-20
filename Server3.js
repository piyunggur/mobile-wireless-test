net  = require('net')
var Map = require("collections/map.js");
var map = new Map();


clients = [];




function getIP(name,ip){
	clients[ip]=name;
}

server = net.createServer(function(socket){
	socket.on( "error", err => {
    	console.log('=====Error=====');
		socket.destroy();
	});

	socket.on( "timeout", () => {
		console.log("=====TimeOut====");
		socket.destroy();
	});

    socket.on( "end", () => {
		console.log("====End====");
		socket.destroy();
	});

	//console.log(clients.reverse())

	var IP ;
	var NAME;


	socket.on('data',function(data){
		socket.name = socket.remoteAddress;
		var datain = data.toString();

		var ch1 = datain.split(':');
		console.log("in map = ",map);
		console.log("datain = ",datain);
		console.log("ch1 = ",ch1);
		console.log("ch1.length = ",ch1.length);
		console.log("map.get(ch1[0]) = ",map.get(ch1[0]));

		if(ch1.length == 2 && map.get(ch1[0]) === "unknow"){
			map.set(ch1[0],ch1[1]);
			console.log("in here!!!!");
		}

		if(!map.has(ch1[0])){
				socket.write("Please enter your name : ");
				map.set(ch1[0],"unknow");
		}else {
				//datain
				//if(map.get()){}





				var txt = datain.split(':');  //==>[0]->ball [0]->text
				var ch = txt.length;
				if(ch < 2){
						console.log("input invalid.");
				}else{

						console.log(txt[0] + ' send : '+datain);
				}
		}

/*
		var text = data.toString().split(':',2);
		if (text[0] === data.toString()){
			NAME=text[1];
			IP=socket.name;
	  	 	console.log(NAME+' joined the chat')
			getIP(NAME,IP);
			//console.log("arr clients = ",clients)
		}else{
			for (var key in clients){
				if(key === socket.name){
					console.log(clients[key]+' send : '+data.toString());
				}
				if(data.toString()==="exit"){
					console.log( clients[key] + ' has disconnected from the chat.' + socket.id);
					socket.end();
				}
			}
		}
		*/

	});

	process.stdin.resume();
	process.stdin.on('data',function(data){
		socket.write(data);
	});

}).listen(8080);
