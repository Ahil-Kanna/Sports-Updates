function fetch(name) {
    clearAll();
    url1 = "https://cors-anywhere.herokuapp.com/http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject={%22name%22:%22";
    url2 = "%22}";
    //document.getElementById('pname').value
    newApi(url1 + name + url2);

}

function fetch2() {
    clearAll();
    newApi('https://cors-anywhere.herokuapp.com/https://www.easports.com/fifa/ultimate-team/api/fut/item?page=1');
}

function cleandata(json) {
    let fn = [];
    let dob = [];
    let unique_array = []
    for (let i = 0; i < json.length; i++) {
        if (fn.indexOf(json[i].firstName) == -1 || dob.indexOf(json[i].birthdate) == -1) {
            unique_array.push(json[i])
            fn.push(json[i].firstName)
            dob.push(json[i].birthdate)
            //alert(json[i].firstName);
        }
    }
    return unique_array;
}

function readJson(data) {
    //console.log(data);
    var div = document.getElementById('contain');
    data.items = cleandata(data.items);
    x = data.items.length;
    //console.log(x);
    if (x == 0) {
        alert('No player exist in that name');
    }
    if (x > 4) {
        var elem = document.getElementById("foot");
        elem.style.position = "relative";
    }
    for (var i = 0; i < x; i++) {
        div.innerHTML = div.innerHTML + '   <div class="innercontainer">  ' +
            '               <img src="' + data.items[i].headshotImgUrl+ '"  ' +
            '                   alt="Image Unavailable"></img>  ' +
            '               <div class="name">  ' +
            '                   <h3>' + data.items[i].firstName + '</h3>  ' +
            '                   <h3>' + data.items[i].lastName + '</h3>  ' +
            '     ' +
            '               </div>  ' +
            '               <div class="teams">  ' +
            '                   <img src="' + data.items[i].nation.imageUrls.large + '"></img>  ' +
            '                   <h3>' + data.items[i].nation.name + '</h3>  ' +
            '               </div>  ' +
            '               <div class="teams">  ' +
            '                       <img src="' + data.items[i].club.imageUrls.normal.large + '"></img>  ' +
            '                       <h3>' + data.items[i].club.name + '</h3>  ' +
            '               </div>  ' +
            '       <div>  <div id="one">  ' +
            '     ' +
            '                   <h3>Position</h3>  ' +
            '                   <h3>Height</h3>  ' +
            '                   <h3>Weight</h3>  ' +
            '                   <h3>D.O.B.</h3>  ' +
            '                   <h3>Rating</h3>  ' +
            '     ' +
            '               </div>  ' +
            '               <div id="two">  ' +
            '                   <h3>-</h3>  ' +
            '                   <h3>-</h3>  ' +
            '                   <h3>-</h3>  ' +
            '                   <h3>-</h3>  ' +
            '                   <h3>-</h3>  ' +
            '               </div>  ' +
            '               <div id="three">  ' +
            '     ' +
            '     ' +
            '     ' +
            '                   <h3>' + data.items[i].position + '</h3>  ' +
            '                   <h3>' + data.items[i].height + '</h3>  ' +
            '                   <h3>' + data.items[i].weight + '</h3>  ' +
            '                   <h3>' + data.items[i].birthdate + '</h3>  ' +
            '                   <h3>' + data.items[i].rating + '</h3>  ' +
            '     ' +
            '               </div> </div> ' +
            '     ' +
            '     ' +
            '           </div>  ' +
            '    ';
    }
}


//CLEAR CONTENT TO LOAD NEW CONTENT
function clearAll() {
    //alert('cleared');
    var elem = document.getElementById('contain');
    var elem1 = document.getElementsByClassName("innercontainer");
    let len = elem1.length;
    while (len--)
        elem.removeChild(elem1[0]);
    var elem = document.getElementById("foot");
    elem.style.position = "absolute";
}


//HIDE LOADER
function reqListener() {
    document.getElementById('loader').style.display = "none";
}


//SHOW LOADER  
function updateProgress() {
    document.getElementById('loader').style.display = "block";
    document.getElementById('loader').style.top = (screen.height / 2);
    document.getElementById('loader').style.left = (screen.width / 2);
    setTimeout(reqListener, 10000);
}

function newApi(url) {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", url, true);
    xhReq.addEventListener("progress", updateProgress);
    xhReq.addEventListener("load", reqListener);
    xhReq.send();
    xhReq.onreadystatechange = function () {
        setTimeout(reqListener, 10000);
        if (xhReq.readyState == 4 && xhReq.status == 200) {
            readJson(JSON.parse(xhReq.responseText));
        } else if (xhReq.readyState == 4) {
            updateProgress();
        }
    }
}

var timeoutID;
 
function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);
 
    startTimer();
}
setup();
 
function startTimer() {
    // wait 2 seconds before calling goInactive
    timeoutID = window.setTimeout(goInactive, 1000);
}
 
function resetTimer(e) {
    window.clearTimeout(timeoutID);
 
    goActive();
}
 
function goInactive() {
    // do something
   // if(document.getElementsByTagName('body'). == 0)
   if(window.scrollY>50)
    document.getElementById('navbar').style.display='none';
    
}
 
function goActive() {
    // do something
    document.getElementById('navbar').style.display='block';
         
    startTimer();
}