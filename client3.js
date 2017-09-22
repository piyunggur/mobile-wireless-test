var net = require('net');
var ip = require('ip')
socket = new net.Socket()
socket.connect(8080, '192.168.100.4', function() {
  var ip1 = socket.address();
  console.log("ip in clients = ", ip1);
  socket.write(ip.address());
  //socket.write("name:ball")
  process.stdin.on('data', function(data) {
    var check = data.toString().split(':');
    if (check.length < 3) {
      socket.write(ip.address() + ':' + data);
    } else {
      console.log('Invalid input format.');
    }
  })
})

socket.on('data', function(data) {
  var datain = data.toString().split(':');
  if (datain[0] === ip.address() && datain[1] === 'logout') {
    console.log("============ Log Out. ============");
  } else if (datain[0] === 'Server') {
    console.log("All message from server : " + datain[1]);
  } else if (datain[0] === ip.address()) {
    console.log('Direct message from server : ' + datain[1]);
  } else {
    if (datain.length == 2) {
      console.log(datain[0] + ' ' + datain[1]);
    } else {
      console.log(datain[0]);
    }
  }
})
