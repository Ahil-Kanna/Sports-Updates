//SET START AND END DATES
var dateStart;
var dateEnd;

let flag=0;

function setseDate(s, e) {
    dateStart = new Date(s);
    dateEnd = new Date(e);
}

//COUNTRY CODE
function cCode(alpha) {
    if (alpha == "ENG"||alpha=='SCO')
        alpha = "gbr";

    return alpha.toLowerCase();
}

// FORMAT DATE TO YYYY-MM-DD
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


//SET HTML PAGE CONTENTS
function readJson(mydata) {
    //let model=[];
    var section = document.getElementById('data');
    let x = mydata.results['length'];
    if (document.getElementsByClassName('container1').length > 5) {
        var elem = document.getElementById("foot");
        elem.style.position = "relative";
    }
    for (var i = 0; i < x; i++) {
        flag++;
        if (mydata.results[i].sport_event.tournament_round.name == undefined) {
            mydata.results[i].sport_event.tournament_round.name = "Group Stage";
        }
       /* try{
            if (mydata.results[i].sport_event.venue.name == undefined) {
                mydata.results[i].sport_event.venue.name = "";
            }
            if (mydata.results[i].sport_event.venue.city_name == undefined) {
                mydata.results[i].sport_event.venue.city_name = "";
            }
        }
        catch(msg){
            mydata.results[i].sport_event.venue.city_name = "";
            mydata.results[i].sport_event.venue.name = "";
        }*/
        section.innerHTML = section.innerHTML +
            "<article class=\"container1\">\r\n  <header>\r\n  <h1>" + mydata.results[i].sport_event.tournament.name + "<\/h1>\r\n  <h2>" + mydata.results[i].sport_event.tournament_round.name +
            "<\/h2>\r\n  <\/header>\r\n  <div>\r\n      <div class=\"team\">\r\n          <img src=\"" + "https://restcountries.eu/data/" + cCode(mydata.results[i].sport_event.competitors[0].country_code) + ".svg\">\r\n          <h1>" + mydata.results[i].sport_event.competitors[0].country_code +
            "<\/h1>\r\n          <h3>" + mydata.results[i].sport_event.competitors[0].qualifier + "<\/h3>\r\n          <h2>" + mydata.results[i].sport_event_status.home_score + "<\/h2>\r\n\r\n      <\/div>\r\n      <div class=\"team\">\r\n          <img src=\"" + "https://restcountries.eu/data/" + cCode(mydata.results[i].sport_event.competitors[1].country_code) + ".svg\">\r\n          <h1>" + mydata.results[i].sport_event.competitors[1].country_code +
            "<\/h1>\r\n          <h3>" + mydata.results[i].sport_event.competitors[1].qualifier + "<\/h3>\r\n          <h2>" + mydata.results[i].sport_event_status.away_score + "<\/h2>\r\n      <\/div>\r\n      <h1 class=\"status\">" + mydata.results[i].sport_event_status.status + "<\/h1>\r\n      <h1 class=\"status\">" + mydata.results[i].sport_event.scheduled +
            "<\/h1>\r\n  <\/div>\r\n  <footer style=\"width:100%\">\r\n  \r\n  <h2>" +/* mydata.results[i].sport_event.venue.name + "," + mydata.results[i].sport_event.venue.city_name*/ + "<\/h2>\r\n  \r\n  <\/footer>\r\n        <\/article>";
    
            let match={
                'tournament':mydata.results[i].sport_event.tournament.name,
                'team1':mydata.results[i].sport_event.competitors[0].country_code,
                'team2':mydata.results[i].sport_event.competitors[1].country_code,
                'score1':mydata.results[i].sport_event_status.home_score,
                'score2':mydata.results[i].sport_event_status.away_score,
                'flag1':"https://restcountries.eu/data/" + cCode(mydata.results[i].sport_event.competitors[0].country_code)+'.svg',
                'flag2':"https://restcountries.eu/data/" + cCode(mydata.results[i].sport_event.competitors[1].country_code)+'.svg',
                'status':mydata.results[i].sport_event_status.status,
                //'venue':mydata.results[i].sport_event.venue.city_name
            }
            var doc = $.parseXML("<match xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"result.xsd\"></match>")
            var json = match;
            var xml = doc.getElementsByTagName("match")[0]
            var key, elem

            for (key in json) {
            if (json.hasOwnProperty(key)) {
                elem = doc.createElement(key)
                $(elem).text(json[key])
                xml.appendChild(elem)
            }
            }

            console.log(xml.outerHTML)
            if(flag==1)
            writeToFile('<?xml version="1.0" encoding="UTF-8"?> '+xml.outerHTML);
            firebase.database().ref("Results/"+mydata.results[i].sport_event.scheduled).set(match);
        }
}

//API URL
let url = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer-t3/intl/en/schedules/";

let url1 = "/results.json?api_key=5gvgujcwvpzv7eukdeuy2wsb";

//LOOP THROUGH ALL DATES
let dates;
let year, month, day;

function fetch() {
    flag=0;
    //console.log(dateStart + dateEnd);
    let start = new Date(dateStart);
    let end = new Date(dateEnd);
    //console.log(start + end);
    year = start.getFullYear(),
        month = start.getMonth()
    day = start.getDate(),
        dates = [start];

    while (dates[dates.length - 1] <= end) {
        dates.push(new Date(year, month, ++day));

    }
    dates = dates.reverse();
    y(dates, 0);
}

//API CALL FOR ALL DATES
function y(dates, n) {
    if (n < dates.length) {
        newApi(url + formatDate(dates[n]) + url1, n);
    }
    else if(n == dates.length&&flag==0){
        toast('No match between date range');
    }
}

//CLEAR CONTENT TO LOAD NEW CONTENT
function clearAll() {
    var elem = document.getElementById('data');
    var elem1 = document.getElementsByTagName("article");
    let len = elem1.length;
    while (len--)
        elem.removeChild(elem1[0]);
    var elem = document.getElementById("foot");
    elem.style.position = "absolute";
    fetch();

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

//FETCHES JSON FROM API
function newApi(url, n) {

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", url, true);
        xhReq.addEventListener("progress", updateProgress);
        xhReq.addEventListener("load", reqListener);
        xhReq.send();
        xhReq.onloadend = function() {
            if(xhReq.status == 404) 
                { 

                }
        }
        xhReq.onreadystatechange = function () {
            setTimeout(reqListener, 10000);
            if (xhReq.readyState == 4 && xhReq.status == 200) {
                readJson(JSON.parse(xhReq.responseText));
                y(dates, ++n);
            } else if (xhReq.readyState == 4) {
                updateProgress();
                y(dates, ++n);
            }
        }

}

function openStat() {

    let x = document.getElementById('stat');
    if (x.style.display === 'block') {
        x.style.display = 'none';
        document.getElementById('cover').style.display = 'none';

    } else {
        x.style.display = 'block';
        document.getElementById('cover').style.display = 'block';
    }
}

document.addEventListener("click", function (event) {

    // If user clicks inside the element, do nothing
    if (event.target.closest(".sidebar")) return;

    // If user clicks outside the element, hide it!

    document.getElementById('stat').style.display = 'none';
    document.getElementById('cover').style.display = 'none';
});

function writeToFile(data){
    if(flag==1){
    function download() {
      var fileName = "result.xml";
      var pp = document.createElement('a');
      pp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
      pp.setAttribute('download', fileName);
      pp.click();
    }
    setTimeout(function() {
      download()
    }, 500);}
  }
function toast(msg){
    
    var x = document.getElementById("snackbar");
    x.innerHTML=msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    
}