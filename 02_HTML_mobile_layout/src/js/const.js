import {firstAction, secondAction, thirdAction} from './common.js';

const list = document.getElementById("list"), microphone = document.getElementById("micro"), stream = document.getElementById("stream");

list.addEventListener("click", firstAction);
microphone.addEventListener("click", secondAction);
stream.addEventListener("click", thirdAction);