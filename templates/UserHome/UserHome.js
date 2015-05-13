var contentContainer;
var notification;
var	sender = new HttpAPI();
var temp;



baseUrl = "/apis/SmartVote";

window.onload(init());


function init() {
	
	contentContainer = document.getElementById("contentContainer");
	
	notification = document.createElement("h3");	

	
	loadInformation();
	//window.alert(sessionStorage.username);
}


function loadInformation(){
	//window.alert("initialing");

	//window.alert(sessionStorage.username);
	
	var temp = LoginAs();
	
	if(temp == "organizer"){
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Organizer: "+ sessionStorage.username +"<i class='fa fa-caret-down'></i>";
		document.getElementById("anoPoll").style.display="none";
	
	}else if(temp == "voter"){
		
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Voter: "+ sessionStorage.username+" <i class='fa fa-caret-down'></i>";
		document.getElementById("createPoll").style.display="none";
		document.getElementById("anoPoll").style.display="none";
		
	}else if(temp == "anoVoter"){
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Anonymous Voter: "+sessionStorage.username +" <i class='fa fa-caret-down'></i>";
		
		document.getElementById("showPolls").style.display="none";
		document.getElementById("createPoll").style.display="none";
	
	}else{
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Not login" +" <i class='fa fa-caret-down'></i>";
		
		document.getElementById("changeFirstPassword").style.display="none";
		document.getElementById("showPolls").style.display="none";
		document.getElementById("createPoll").style.display="none";
		document.getElementById("anoPoll").style.display="none";
	}
	
	
	
}



function showPolls(){	
	
	contentContainer.innerHTML = "";	
	
	showPollList();
	
}



function createPoll(){
	
	contentContainer.innerHTML = "";
	
	loadPollModuleSelection();

	
}


function anoPoll(){
	contentContainer.innerHTML = "";
	
	loadBasicPollInformation(contentContainer, sessionStorage.pollName, true);
}

function changePassword(){
	
	var temp = LoginAs();
	
	if(temp == "organizer" || temp == "voter"){
		changeFirstPassword();
		
	}else if(temp == "anoVoter"){
		
		changeSecondPassword(sessionStorage.username,sessionStorage.pollName);
		
	}
	
	
}




function jumpToLogin() {
	
	window.location.href = "../../index.html";
	
	sessionStorage.username = "";
	sessionStorage.identity = "";
	sessionStorage.pollName = "";
	
}




