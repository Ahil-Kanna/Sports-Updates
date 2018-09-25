function slide() {
    swap();
    if (x == "slide") {
        // window.scrollTo(0,document.body.scrollHeight);
        $(document.scrollingElement).animate({
            scrollTop: document.body.scrollHeight
        }, 500);

    } else {
        //window.scrollTo(0,0);
        $(document.scrollingElement).animate({
            scrollTop: 0
        }, 500);

    }
}

function swap() {
    x = document.getElementById('tog').className;
    if (x == "slide") {
        document.getElementById('tog').className = "slideu";
        document.getElementById('updown').src = "Icons/bottom.svg";
    } else {
        document.getElementById('tog').className = "slide";
        document.getElementById('updown').src = "Icons/top.svg";
    }
}

function loadabout() {
    document.getElementById('frames').style.display = "block";
    document.getElementById('cont').style.display = "none";
    document.getElementById('foot').style.position = "fixed";

}

function closeabout() {
    document.getElementById('frames').style.display = "none";
    document.getElementById('cont').style.display = "block";
    document.getElementById('foot').style.position = "relative";
    slide();

}

function live() {
    window.location.href = "live.html";
}

function stat() {
    window.location.href = "stats.html";

}

function news() {
    window.location.href = "news.html";

}