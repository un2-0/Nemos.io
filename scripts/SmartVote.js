var httpApi;
var baseUrl;

function showDefaultVoting() {
    var voting = httpApi.send("GET", baseUrl + "/getVoting?votingName=default", null)
    //window.alert("before parsing");
    voting = JSON.parse(voting);
    //var voting = jQuery.parseJSON(ret);
    //window.alert("done");
    var showDiv = document.getElementById("show_place");
    var candNum = voting.candidates.length;

    //Create and append a form
    var form = document.createElement("FORM");
    showDiv.appendChild(form);

    //Create and append the options
    for (var i = 0; i < candNum; i++) {
        var radio = document.createElement("INPUT");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", voting.name);
        radio.id = voting["candidates"][i];

        var label = document.createElement("LABEL");
        label.appendChild(document.createTextNode(voting["candidates"][i]));
        form.appendChild(radio);
        form.appendChild(label);
        form.appendChild(document.createElement("BR"));
    }

    var submitBtn = document.createElement("BUTTON");
    submitBtn.appendChild(document.createTextNode("Vote"));
    showDiv.appendChild(submitBtn);
}

function addVoting() {
    document.getElementById("creat_btn").disabled = true;
    var votingName = document.getElementById("new_voting_name").value;

    if (votingName === "") {
        window.alert("Voting name cannot be empty");
        return;
    }

    httpApi.sendAsync("POST", baseUrl + "/addVoting?votingName=" + votingName, null,
        function () {
            document.getElementById("creat_btn").disabled = false;
            window.alert("New voting created.");
            updateVotingNumInPage();
        }
    );
}

function updateVotingNumInPage() {
    document.getElementById("voting_num").innerHTML = getVotingNum();
}

function getVotingNum() {
    var vtnum = httpApi.send("GET", baseUrl+"/getVtNum", null);
    return vtnum;
}

var HttpAPI = function() {

    this.send = function(method, url, body) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open(method, url, false);
        if (typeof(body) === "undefined") {
            body = null;
        }
        xmlHttp.send(body);
        return xmlHttp.responseText;
    }

    this.sendAsync = function(method, url, body, callbackFn) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState === 4) {
                callbackFn(xmlHttp);
            }
        };
        xmlHttp.open(method, url, true);
        if (typeof(body) === "undefined") {
            body = null;
        }
        xmlHttp.send(body);
        return;
    }
}

function init() {
    baseUrl = "/apis/SmartVote";
    httpApi = new HttpAPI();

    var btn = document.getElementById("createBtn");
    btn.onclick = addVoting;

    var showBtn = document.getElementById("showBtn");
    showBtn.onclick = showDefaultVoting;

    updateVotingNumInPage();
}

window.onload = init;