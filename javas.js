
const show = document.getElementById("demo");
var selectionStartt = 0;
var selectionEndd = 0;
var start = 0;
var startol;
var old = 0;

function textformat(text,limit){
    var t = []
    if (text.length<limit){
        t.push(text)
    } else{
        var k = 0
        for (var i=1;i<=text.length;i++){ // 0   50   100
            if(i % limit == 0){
                t.push(text.substring(k,i).replace(/\w{3}$/gi, '...'))
                k=i+1
            }
        }
        if ((text.length - k) >= 0){
            t.push(text.substring(k, text.length).replace(/\w{3}$/gi, '...'))
        }
    }
    show.value += t +"\n"
}

$(document).ready(function(){
    $("#demo").keyup(function(){
        autoGrow(show);
    });
    $(document).mousedown(function(e){
        if( e.button == 0 ) {
            // var val = $.trim($("textarea").val());
            // if (val != "") {
            //     alert(val);
            //     autoGrow(show);
            // }
            autoGrow(show);
        }
    });
});
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == 8) {
    selectionStartt = document.getElementById("demo").selectionStart;
    selectionEndd = document.getElementById("demo").selectionEnd;
    document.getElementById("demo").setSelectionRange(selectionStartt, selectionEndd);
    if (selectionStartt <= startol) {
     var audio = new Audio('sound\\beep.mp3');
       audio.play();  
      return false;
    }
    selectionStartt = selectionStartt - 1;
    selectionEndd = selectionEndd - 1;
  }
}

document.getElementById('demo').addEventListener('keyup', e => {
  // console.log('index at: ', e.target.selectionStart)
  selectionStartt = e.target.selectionStart;
  selectionEndd = e.target.selectionStart;
  document.getElementById("demo").setSelectionRange(selectionStartt, selectionEndd);
})

// click 

function tt() {
  selectionStartt = document.getElementById("demo").selectionStart;
  selectionEndd = document.getElementById("demo").selectionEnd;
  //  console.log("click = "+selectionStartt);
  document.getElementById("demo").setSelectionRange(selectionStartt, selectionEndd);
}

/// read 

function readonly() {
  var el = document.getElementById("demo")
  var x2 = el.value.slice(0, el.selectionStart).length;

  selectionStartt = document.getElementById("demo").selectionStart;
  selectionEndd = document.getElementById("demo").selectionEnd;
  // console.log(selectionStartt);
  document.getElementById("demo").setSelectionRange(selectionStartt, selectionEndd);
  selectionStartt = selectionStartt + 1;
  selectionEndd = selectionEndd + 1;

  if (x2 < startol) {
   var audio = new Audio('sound\\beep.mp3');
   audio.play();
    return false;
  }
}
//// enter 
function runScript(e) {
  old = startol;
  if (e.keyCode == 13) {
    var el = document.getElementById('demo');
    var val = el.value;
    var x = val.slice(0, el.selectionStart).length;

    //  ห้ามกด ENTER
    if (old > x) {
      return false;
    }
    console.log("index : " + x);
    var text = el.value.substring(start, x);
    console.log(text);
    addtext(text);
    if (start == x) {
      start = null;
      x = null;
    }
    $('.demo').highlightWithinTextarea({
      highlight: [
        {
          highlight: [start, x],
          className: 'highlight2'
        },
        {
          highlight: [0, old],
          className: 'highlight'
        },

      ],
    });
    start = el.selectionStart
    startol = start;
    return false;
  }

}

function autoGrow(oField) {
  if (oField.scrollHeight > oField.clientHeight) {
    oField.style.height = oField.scrollHeight + "px";
  }
}

var openFile = function(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    var node = document.getElementById('demo');
    // node.value += text+"\n";
     test(text);
    autoGrow(show);
  };
  reader.readAsText(input.files[0]);
};

function test(tt){

     var a2  = tt.split('\n');
    for (var i =0 ; i< a2.length ;i++){
        textformat(a2[i],100);
    }

}

$(function () {
  // Target a single one
  $("#paper-content").linedtextarea();

});

$(function () {
  // Target a single one
  $("#showoutopt").linedtextarea();
});



function showuoutput(output) {
    // var tex = output.split("\n");
    document.getElementById('showoutopt').value += output;
    var objDiv = document.getElementById("showoutopt");
    objDiv.scrollTop = objDiv.scrollHeight;
}


// 
//       รับข้อมูลจาก server
// 
// 

// ทำการเชื่อม Websocket Server ตาม url ที่กำหนด
var connection = new WebSocket('ws://localhost:8001')
connection.onopen = function () {
  // จะทำงานเมื่อเชื่อมต่อสำเร็จ
  console.log("connect webSocket");
  connection.send("Hello ABCDEF"); // ส่ง Data ไปที่ Server
};
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};
connection.onmessage = function (e) {
  // log ค่าที่ถูกส่งมาจาก server
  console.log("message from server: ", e);
  showtext(e.data);
};
function showtext(data) {
  show.value += data+ "\n";
  // console.log(data);
  show.setSelectionRange(selectionStartt, selectionEndd);
  autoGrow(show);
}


function addtext(text ) {
    // ทำการเชื่อม Websocket Server ตาม url ที่กำหนด
    var connection2 = new WebSocket('ws://localhost:8005')
    connection2.onopen = function () {
        // จะทำงานเมื่อเชื่อมต่อสำเร็จ
        console.log("connect webSocket");
        connection2.send(text); // ส่ง Data ไปที่ Server
    };
    connection2.onerror = function (error) {
        console.error('WebSocket Error ' + error);
    };
    connection2.onmessage = function (e) {
        // log ค่าที่ถูกส่งมาจาก server
        console.log("message from server: ", e.data);
        showuoutput(e.data);
    };

}


