var contentContainer;
var notification;
var	sender = new HttpAPI();
var temp;

baseUrl = "/apis/SmartVote";

window.onload(init());


function init() {
	
	contentContainer = document.getElementById("contentContainer");
	
	main = document.getElementById("main");
	main.addEventListener("click",function(){
		showDefaultContent();		
	});
	
	
	showPolls = document.getElementById("showPolls");
	showPolls.addEventListener("click",function(){
		showPolls();		
	});
	
	
	createPoll = document.getElementById("createPoll");
	createPoll.addEventListener("click",function(){
		createPoll();		
	});
	
	
	anoPoll = document.getElementById("anoPoll");
	anoPoll.addEventListener("click",function(){
		showAnoPoll();		
	});
	
	changeFirstPassword = document.getElementById("changeFirstPassword");
	changeFirstPassword.addEventListener("click",function(){
		changeFirstPassword();		
	});
	
	
	logout = document.getElementById("logout");
	logout.addEventListener("click",function(){
		jumpToLogin();		
	});
	
	
	notification = document.createElement("h3");	

	loadInformation();

}


function loadInformation(){
	//window.alert("initialing");

	//window.alert(sessionStorage.username);
	
	if(LoginAs() == "organiser"){
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Organiser: "+ sessionStorage.username +"<i class='fa fa-caret-down'></i>";
		
	
	}else if(LoginAs() == "voter"){
		
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Voter: "+ sessionStorage.username+" <i class='fa fa-caret-down'></i>";
		document.getElementById("createPoll").style.display="none";
	
	}else{
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"Not login" +" <i class='fa fa-caret-down'></i>";
		document.getElementById("changeFirstPassword").style.display="none";
		document.getElementById("showPolls").style.display="none";
		document.getElementById("createPoll").style.display="none";
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







function jumpToLogin() {
	
	window.location.href = "../../index.html";
	
	sessionStorage.username = "";
	sessionStorage.identity = "";
	
	
}




