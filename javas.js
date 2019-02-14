
const show = document.getElementById("demo");
var selectionStartt=0;
var selectionEndd=0;
// var min=2000; 
// var max=3000;  
var text="";
var start = 0;
var startol;
var old = 0;
// textSequence(0);
// function textSequence(i) {
//     if (foo.length > i) {
//         setTimeout(function() {
//              text = foo[i];
//              show.value += foo[i]+"\n";
//             //  TLN.append_line_numbers('demo');
//             // console.log(text)
//              textSequence(++i);  
//             //  var sel = window.getSelection();
//             //  sel.removeAllRanges();
//             show.setSelectionRange(selectionStartt, selectionEndd);
//             //   console.log("loop = "+selectionStartt);
//              autoGrow(show);
//         }, Math.round(Math.random() * (+max - +min) + +min) ); // time 
       
//     }
// }

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == 8) {
        selectionStartt = document.getElementById("demo").selectionStart;
        selectionEndd = document.getElementById("demo").selectionEnd;
        document.getElementById("demo").setSelectionRange( selectionStartt, selectionEndd);
        if(selectionStartt<=startol){
            alert("ข้อความถูกส่งออกไปแล้ว ไม่สามารถแก้ไขได้ หรือ ไม่ส่งซ้ำได้");
           return false;
       }
        selectionStartt=selectionStartt-1;
        selectionEndd=selectionEndd-1;
    }
}

document.getElementById('demo').addEventListener('keyup', e => {
    // console.log('index at: ', e.target.selectionStart)
    selectionStartt =  e.target.selectionStart;
    selectionEndd = e.target.selectionStart;
    document.getElementById("demo").setSelectionRange(selectionStartt,selectionEndd);   
  })

   // click 

function tt(){
    selectionStartt = document.getElementById("demo").selectionStart;
    selectionEndd = document.getElementById("demo").selectionEnd;
    //  console.log("click = "+selectionStartt);
    document.getElementById("demo").setSelectionRange( selectionStartt, selectionEndd);
}

/// read 

function readonly(){
    var el = document.getElementById("demo")
    var x2= el.value.slice(0, el.selectionStart).length;

    selectionStartt = document.getElementById("demo").selectionStart;
    selectionEndd = document.getElementById("demo").selectionEnd;
    // console.log(selectionStartt);
    document.getElementById("demo").setSelectionRange( selectionStartt, selectionEndd);
    selectionStartt=selectionStartt+1;
    selectionEndd=selectionEndd+1;

    if(x2<startol){
         alert("ข้อความถูกส่งออกไปแล้ว ไม่สามารถแก้ไขได้ หรือ ไม่ส่งซ้ำได้");
        return false;
    }
}
//// enter 
function runScript(e) {
     old = startol;
    if (e.keyCode == 13) {
        var el= document.getElementById('demo'); 
        var val = el.value;
        var x= val.slice(0,el.selectionStart).length;

        //  ห้ามกด ENTER
        if (old > x) {
             return false; 
        }
        console.log("index : "+x);
        var text = el.value.substring(start, x);
        console.log(text);
        showuoutput(text);
        if(start == x){
           start = null;
           x = null;
        }
        $('.demo').highlightWithinTextarea({
            highlight: [
                {
                    highlight: [start,x],
                    className: 'highlight2'
                },
                {
                    highlight: [0,old],
                    className: 'highlight'
                },
              
            ],
        });
        start = el.selectionStart
        startol = start;
        return false; 
    }
    
}
function autoGrow (oField) {
    if (oField.scrollHeight > oField.clientHeight) {
      oField.style.height = oField.scrollHeight + "px";
    }
  }

  function autoGrow2 (oField) {
    if (oField.scrollHeight > oField.clientHeight) {
      oField.style.height = oField.scrollHeight + "px";
    }
  }
  $(function() {
     // Target a single one
    $("#paper-content").linedtextarea();
  
  });

  $(function() {
    // Target a single one
   $("#showoutopt").linedtextarea();
 });

function showuoutput(output){
    tex = output.split(" ");
        document.getElementById('showoutopt').innerHTML += tex.join() + "\n";
        var objDiv = document.getElementById("showoutopt");
        objDiv.scrollTop = objDiv.scrollHeight;
// autoGrow2(document.getElementById('showoutopt'));
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
  console.log("message from server: ", e.data);
  showtext(e.data);
};
function showtext(data) {
    show.value += data+"\n";
    show.setSelectionRange(selectionStartt, selectionEndd);
    autoGrow(show);
}
   

