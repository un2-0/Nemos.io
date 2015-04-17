var httpApi;
var baseUrl;

window.onload = init;

function init() {
    baseUrl = "/apis/SmartVote";
    httpApi = new HttpAPI();
    document.getElementById("showpoll").onclick = showPoll;

}

function showPoll() {
    getStat(escape(document.getElementById("textbox_plname").value));
}

function getStat(plname) {
    var opnum = httpApi.send("GET", baseUrl + "/getOpnum&" + plname, null);
    var stat = httpApi.send("GET", baseUrl + "/showStat&" + plname, null);
    var description = httpApi.send("GET", baseUrl + "/getDescription&" + plname, null);
    var opentime = httpApi.send("GET", baseUrl + "/getOpentime&" + plname, null);
    var closetime = httpApi.send("GET", baseUrl + "/getClosetime&" + plname, null);
    var createtime = httpApi.send("GET", baseUrl + "/getCreatetime&" + plname, null);
    var creatorusrname = httpApi.send("GET", baseUrl + "/getCreatorusrname&" + plname, null);
    var statlist = stat.split('"').join("");
    statlist = statlist.split(";");
    var statlen = statlist.length;
    document.getElementById('info').innerHTML = "";
    document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + '<h2>Poll name: ' + '<h3  id="title_plname">' + plname + '</h3></h2>';
    document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + '<p>Description: ' + description.split('"').join("") + '</p>';
    document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + '<p>Open time: ' + opentime.split('"').join("") + '</p>';
    document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + '<p>Close time: ' + closetime.split('"').join("") + '</p>';
    document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + '<p>Create time: ' + createtime.split('"').join("") + '</p>';
    document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + '<p>Creator: ' + creatorusrname.split('"').join("") + '</p>';
    document.getElementById('candlist').innerHTML = "";
    for (var i = 1; i <= statlen; i++) {
        document.getElementById('candlist').innerHTML = document.getElementById('candlist').innerHTML + '<p><br>canddidate ' + i + ': ' + statlist[i - 1].toString() + '<p id="cand' + i + '"></p><button id="' + i + '" onclick="vote(this.id)" type="button">Vote</button></p>';
    }
}

function vote(btnId) {
    httpApi.send("GET", baseUrl + "/vote&" + document.getElementById("title_plname").innerHTML + "&" + btnId, null);
    getStat(escape(document.getElementById("title_plname").innerHTML));
}
