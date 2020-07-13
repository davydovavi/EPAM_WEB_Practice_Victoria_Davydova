export function firstAction(){
  var response = document.getElementById("response"), output = "Active: voices list";
  response.innerHTML = output;
}

export function secondAction() {
  var response = document.getElementById("response"), output = "Active: speaker-mode";
  response.innerHTML = output;
}
  
export function thirdAction() {
  var response = document.getElementById("response"), output = "Active: listener-mode";
  response.innerHTML = output;
}
