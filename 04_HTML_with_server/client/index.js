//import './js/common.js'
//import './js/const.js'
//import './scss/main.scss'



var socket = io();
socket.on('playAudio', () => {
  var audio = document.getElementById("tempAudio");
  audio.play();
});
socket.on('audioMessage', function (audioChunks) {
  const audioBlob = new Blob(audioChunks);
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
});
socket.on('allAudioMessages', function (allAudios) {
  //var output = "Active: new-mode";
  //$('#response').text(output);
  const response = document.getElementById('response');
  response.innerHTML = '';
  const ul = document.createElement('ul');
  response.appendChild(ul);
  const data = JSON.parse(allAudios);
  //let data = JSON.stringify(allAudios);
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement('li');
    const audioBlob = new Blob([new Uint8Array(data[i].audioBlob[0].data).buffer]);
    li.innerHTML = `Voice: ${data[i].timeStamp.slice(0, -38)}`;
    ul.appendChild(li);
    li.addEventListener('click', () => {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    })
  }
});

socket.on('getStream', function (allAudios) {
  const data = JSON.parse(allAudios);
  //let data = JSON.stringify(allAudios);
  for (let i = 0; i < data.length; i++) {
    const audioBlob = new Blob([new Uint8Array(data[i].audioBlob[0].data).buffer]);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }
});
$('#micro').click(function (e) {
  var output = "Active: speaker-mode";
  response.innerHTML = output;
  //let div = document.createElement('div');
  //div.id = 'messages';
  let start = document.createElement('button');
  start.id = 'start';
  start.innerHTML = 'Start';
  let stop = document.createElement('button');
  stop.id = 'stop';
  stop.innerHTML = 'Stop';
  //response.appendChild(div);
  response.appendChild(start);
  response.appendChild(stop);
  navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);

      document.getElementById("start").addEventListener('click', function () {
        mediaRecorder.start();
        socket.emit('startRecording');
      });
      let audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", function (event) {
        audioChunks.push(event.data);
      });

      document.getElementById("stop").addEventListener('click', function () {
        mediaRecorder.stop();
      });

      mediaRecorder.addEventListener("stop", function () {
        socket.emit('audioMessage', audioChunks);
        console.log("audiochunks emited");
        audioChunks = [];
      });
    });
});
$('#stream').click(function (e) {
  var output = "Active: listener-mode";
  $('#response').text(output);
  socket.emit("getAudioMessages");

});
$('#list').click(function (e) {
  var output = "Active: all voices";
  $('#response').text(output);
  socket.emit("getAllMessages");
});