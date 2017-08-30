function zazhiganie(){
    socket.send(JSON.stringify({method:"zazhiganie",data:{}}));
}
function zapusk(){
    socket.send(JSON.stringify({method:"zapusk",data:{}}));
}
function fari(d){
    socket.send(JSON.stringify({method:"fari",data:{type:d}}));
}
function povorot(d){
    socket.send(JSON.stringify({method:"povorot",data:{type:d}}));
}
function pechka(d){
    socket.send(JSON.stringify({method:"pechka",data:{type:d}}));
}
function dver(d){
    socket.send(JSON.stringify({method:"dver",data:{type:d}}));
}
function protivotum(){
    socket.send(JSON.stringify({method:"protivotum",data:{}}));
}
function signal(){
    socket.send(JSON.stringify({method:"signal",data:{}}));
}
socket = {}
function connectSocket(){
    // создать подключение
socket = new WebSocket("ws://"+IP+":8081");
socket.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера

  }
  socket = {}
  connectSocket()
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};
// обработчик входящих сообщений
socket.onmessage = function(event) {
  var incomingMessage = event.data;
  showMessage(incomingMessage);
};
}
connectSocket()
var STATUS = {}
// показать сообщение в div#subscribe
function showMessage(message) {
  var DATA = JSON.parse(message)
  STATUS = DATA
  var str = ""
  for(var key in DATA)
  {
    var t = ""

    
    if (DATA[key].type=="D_OUT_R"){
      if (DATA[key].val==1){t="on"}
      if (DATA[key].val==0){t="off"}  
    }else{
        if (DATA[key].val==1){t="on"}
      if (DATA[key].val==0){t="off"}  
    }
    if (DATA[key].hasOwnProperty("attr"))
    {
        
        if (DATA[key].val==1){$("#"+DATA[key].attr).css({"backgroundColor":"green"})}
        if (DATA[key].val==0){$("#"+DATA[key].attr).css({"backgroundColor":"red"})}
    }
    
    
  }
  $('#subscribe').html(message)
  render(STATUS)

}