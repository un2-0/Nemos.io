var	sender = new HttpAPI();
baseUrl = "/apis/SmartVote";
var contentContainer = document.getElementById("contentContainer");

function loadInformation(){
	//window.alert("initialing");

	//window.alert(sessionStorage.userName);
	
	var elections = document.getElementById("VoterDisplayElection");
	var out = "";

	if(sessionStorage.userName !== "" && sessionStorage.userName != null){
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+ sessionStorage.userName +"<i class='fa fa-caret-down'></i>";
	}else {
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"not login " +" <i class='fa fa-caret-down'></i>";
	}

}

function showElections(){
	//document.getElementById("contentContainer").innerHTML = "";
	
	sender.sendAsync("GET", baseUrl+ "/Login&", JSON.stringify(userinfo), function(res){
		
		
		
	});
}

function createPoll(){
	document.getElementById("contentContainer").innerHTML = "";
}


function jumpToLogin() {
	window.location.href = "../../index.html";
}
