import {
  response,
  socket
} from './const.js';



socket.on('audioMessage', function (audioChunks) {
  const audioBlob = new Blob(audioChunks);
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
});

socket.on('allAudioMessages', async function (allAudios) {
  //const data = await allAudios.json();
  for (let i = 0; i < allAudios.length; i++) {
    //const audioBlob = new Blob([new Uint8Array(data[i].audioBlob[0].data).buffer]);
    const audioUrl = URL.createObjectURL(allAudios[i]);
    const audio = new Audio(audioUrl);
    audio.play();
  }
});

socket.on('playAudio', () => {
  var audio = document.getElementById("tempAudio");
  audio.play();
});

export async function getAllVoices() {
  response.innerHTML = '';
  const ul = document.createElement('ul');
  response.appendChild(ul);
  const https = await fetch('https://voicy-speaker.herokuapp.com/voices');
  const data = await https.json();
  console.log(data);
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
};

export function recordMessage() {
  var output = "Active: speaker-mode";
  response.innerHTML = output;
  let div = document.createElement('div');
  div.id = 'messages';
  let start = document.createElement('button');
  start.id = 'start';
  start.innerHTML = 'Start';
  let stop = document.createElement('button');
  stop.id = 'stop';
  stop.innerHTML = 'Stop';
  response.appendChild(div);
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
        var audio = document.getElementById("tempAudio"); ///
        audio.play(); ///
      });
      let audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", function (event) {
        audioChunks.push(event.data);
      });

      document.getElementById("stop").addEventListener('click', function () {
        mediaRecorder.stop();
      });

      mediaRecorder.addEventListener("stop", function () {
        const audioBlob = new Blob(audioChunks, {
          type: 'audio/wav'
        });
        socket.emit("audioMessage", audioChunks);
        console.log("audiochunks emited");
        audioChunks = [];
      });
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
};

export async function listenStream() {
  var output = "Active: listener-mode";
  response.innerHTML = output;
  const https = await fetch('https://voicy-speaker.herokuapp.com/voices');
  const data = await https.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    var audioBlob = new Blob([new Uint8Array(data[i].audioBlob[0].data).buffer]);
    var audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }
}