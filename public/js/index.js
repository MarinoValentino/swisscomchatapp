console.log("Doc Ready");
document.title = 'Messenger';
var socket = io();
var newMessages = "0"

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#messages').append($('<li>').text('A Person: ' + $('#m').val()));
  document.title = 'Messenger';
  newMessages = 0;
  $('#m').val('');
  goToBottom();
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text('A Person: ' + msg));
  newMessages++;
  document.title = 'Messenger (' + newMessages + ')';
  goToBottom();
});

socket.on('user connected', function(userOnline){
  $('#messages').append($('<li>').text('Server: a user has joined the chat'));
  $('.userOnline').html(userOnline);
  goToBottom();
});

socket.on('user disconnected', function(userOnline){
  $('#messages').append($('<li>').text('Server: a user has left the chat'));
  $('.userOnline').html(userOnline);
  goToBottom();
});

function goToBottom(){
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
}
