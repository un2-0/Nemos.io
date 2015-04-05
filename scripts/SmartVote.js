var httpApi;
var baseUrl;

window.onload = init;
function init() {
	baseUrl = "/apis/SmartVote";
	httpApi = new HttpAPI();

	var btn = document.getElementById("creat_btn");
	btn.onclick = addVoting;
	
	updateVotingNumInPage();
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
		if(typeof(body) === "undefined"){
			body = null;
		}
		xmlHttp.send(body);
		return xmlHttp.responseText;
	}

	this.sendAsync = function(method, url, body, callbackFn) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState === 4){
				callbackFn(xmlHttp);
			}
		};
		xmlHttp.open(method, url, true);
		if(typeof(body) === "undefined"){
			body = null;
		}
		xmlHttp.send(body);
		return;
	}
}