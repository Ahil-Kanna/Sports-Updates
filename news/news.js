function readJson(mydata){
    var div = document.getElementById('data');
    let x=100;
    console.log(mydata);
    if( mydata.totalResults<100)
    x=mydata.totalResults;
                     for(var i = 0;i < x; i++)
                     {
                      
                        if(mydata.articles[i].url!=null &&mydata.articles[i].title!=null){
                            if(mydata.articles[i].description==null)
                            {
                                mydata.articles[i].description="";
                            }
                            if(mydata.articles[i].urlToImage==null){
                                mydata.articles[i].urlToImage="http://www.sportupdate.gq/images/sport.jpg";
                            }
                        div.innerHTML = div.innerHTML + "<div class=\"container\"><a href=\""+mydata.articles[i].url+"\"> \n<img src=\""+mydata.articles[i].urlToImage+"\"  style=\"width:100%;height:200px\" class=\"hover-opacity\"> \n</a> \n<div class=\"container pad\"> <a href=\""+mydata.articles[i].url+"\" > \n<p><b> "+mydata.articles[i].title+"</b></p>"+"\n</a> "+"\n<p>"+mydata.articles[i].description+"</p>"+
                        "\n</div> \n</div>";
                        }
                     
                    }
}


let url1 ="https://newsapi.org/v2/top-headlines?sources=espn&apiKey=aa1293652d0541cfbc0e17874727b4a1";
let url2 ="https://newsapi.org/v2/everything?sources=espn&apiKey=aa1293652d0541cfbc0e17874727b4a1";
let url3="https://newsapi.org/v2/top-headlines?sources=fox-sports&apiKey=aa1293652d0541cfbc0e17874727b4a1";
let url ="https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=aa1293652d0541cfbc0e17874727b4a1";

function fetch(){
    newapi(url);
    newapi(url2);
}

function newapi(url){
 var xhReq = new XMLHttpRequest();
xhReq.open("GET", url, true);
xhReq.send();
xhReq.onreadystatechange = function () {
if (xhReq.readyState == 4 && xhReq.status == 200){
    //console.log(xhReq.responseText);
readJson(JSON.parse(xhReq.responseText));}
}
}