function readJson(mydata) {
    var section = document.getElementById('dat');
    console.log(mydata['results']);
  
}
let url = "https://api.sportradar.us/soccer-t3/intl/en/schedules/2018-07-01/results.json?api_key=fvftux7zs8j5e2pf8dzpb4kp";
let url2 = "";

function fetch() {
    newapi(url);
    //newapi(url2);
}

function newapi(url) {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", url, true);
    xhReq.send();
    xhReq.onreadystatechange = function () {
        if (xhReq.readyState == 4 && xhReq.status == 200){
  readJson(JSON.parse(xhReq.responseText));}
    }
}