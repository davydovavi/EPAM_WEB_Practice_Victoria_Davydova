import {getAllVoices, recordMessage, listenStream} from './common.js';
import io from "socket.io-client";

export const list = document.getElementById("list"), microphone = document.getElementById("micro"), stream = document.getElementById("stream");
export const response = document.getElementById("response");
export const socket = io.connect('https://voicy-speaker.herokuapp.com');

list.addEventListener("click", getAllVoices);
microphone.addEventListener("click", recordMessage);
stream.addEventListener("click", listenStream);