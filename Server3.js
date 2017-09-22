net = require('net')
var Map = require("collections/map.js");
var map = new Map();

server = net.createServer(function(socket) {
  socket.on("error", err => {
    console.log('=====Error=====');
    socket.destroy();
  });

  socket.on("timeout", () => {
    console.log("=====TimeOut====");
    socket.destroy();
  });

  socket.on("end", () => {
    console.log("============ Log Out. ============");
    socket.destroy();
  });

  socket.on('data', function(data) {
    socket.name = socket.remoteAddress;
    var datain = data.toString();
    var ch1 = datain.split(':');
    console.log("in map = ", map);
    // console.log("datain = ", datain);
    // console.log("ch1 = ", ch1);
    // console.log("ch1.length = ", ch1.length);
    // console.log("map.get(ch1[0]) = ", map.get(ch1[0]));

    if (ch1.length == 2 && map.get(ch1[0]) === "unknow") {
      map.set(ch1[0], ch1[1].replace('\r\n', ""));
      //console.log("in here!!!!");
      socket.write("============ Connect Finished. ============");
    }

    if (!map.has(ch1[0])) {
      socket.write("Please enter your name -> ");
      map.set(ch1[0], "unknow");
    } else {
      if (ch1.length == 2) {
        if (ch1[1] === 'exit\r\n') { //พิมพ์ exit แล้วให้ออกจากระบบ
          console.log(map.get(ch1[0]) + ' disconnected from server.');
          socket.write(ch1[0] + ':logout');
          socket.end();
        } else {
          console.log(map.get(ch1[0]) + ' send : ' + ch1[1]);
        }
      } else if (ch1.length == 3) {
        //console.log('add code for send text between clients');
        var count = 0;
        for (var i of map) { //วนเพื่อเอา key
          console.log(i);
          if (map.get(i[0]) === ch1[1]) {
            socket.write(map.get(ch1[0]) + ' send text :' + ch1[2]);
            count++;
            break;
          }
        }
        if (count == 0) {
          console.log('Don\'t miss user for sent text message.');
          socket.write('Don\'t miss user for sent text message.');
        }
      } else {
        console.log('Error input');
      }
    }
  });
  process.stdin.resume();
  process.stdin.on('data', function(data) {
    var dataout = data.toString().replace('\r\n', ""); //ลบ \r\n ออกจากข้อความที่พิมพ์จากคีย์บอร์ด
    var txt = dataout.split(':');
    if (txt.length == 1) {
      socket.write('Server:' + dataout); //server ส่งข้อความหาทุกคน
    } else if (txt.length == 2) {
      //console.log(txt);
      var count = 0;
      for (var i of map) { //วนเพื่อเอา key
        //console.log(i[0]);
        if (map.get(i[0]) === txt[0]) {
          socket.write(i[0] + ':' + txt[1]);
          count++;
          break;
        }
      }
      if (count == 0) {
        console.log('Don\'t miss user for sent text message.');
      }
    } else {
      console.log('Invalid send text format.');
    }
  });
}).listen(8080);
