import {getAllVoices, recordMessage, listenStream} from './common.js';

export const list = document.getElementById("list"), microphone = document.getElementById("micro"), stream = document.getElementById("stream");
export const response = document.getElementById("response");

list.addEventListener("click", getAllVoices);
microphone.addEventListener("click", recordMessage);
stream.addEventListener("click", listenStream);