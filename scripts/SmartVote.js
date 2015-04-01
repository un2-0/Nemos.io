var http_api;
var base_url;

window.onload = init;
function init() {
	base_url = "/apis/SmartVote";
	http_api = new HttpAPI();

	var btn = document.getElementById("creat_btn");
	btn.onclick = addVoting;
	
	document.getElementById("voting_num").innerHTML = getVotingNum();
	//alert(getVotingNum());
}

function addVoting() {
	var voting_name = document.getElementById("new_voting_name").value;
	
	if (voting_name === "") {
		window.alert("Voting name cannot be empty");
		return;
	}
	
	var json_obj = {
			name : voting_name
	};
	
	
}

function getVotingNum() {
	var vtnum = http_api.send("GET", base_url+"/get_vtnum", null);
	return vtnum;
}

var HttpAPI = function(){

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