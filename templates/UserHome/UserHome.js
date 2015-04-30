var contentContainer;
var notification;
var	sender = new HttpAPI();
baseUrl = "/apis/SmartVote";
window.onload = init;


function init() {
	
	contentContainer = document.getElementById("contentContainer");
	
	notification = document.createElement("h3");	

	loadInformation();

}


function loadInformation(){
	//window.alert("initialing");

	//window.alert(sessionStorage.userName);

	if(isSessionStorageEmpty() == false){
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+ sessionStorage.userName +"<i class='fa fa-caret-down'></i>";
	}else {
		document.getElementById("welcomer").innerHTML = "<span class='glyphicon glyphicon-user padding-right-small' style='position: relative; top: 3px;'></span>"+"not login " +" <i class='fa fa-caret-down'></i>";
	}

}

function showElections(){
	 
	contentContainer.innerHTML = "";
	
	contentContainer.appendChild(notification);

	if(isSessionStorageEmpty() == false){
		
		var temp = {username: sessionStorage.userName};
		
		notification.innerHTML = "loading elections of current user...";
		
		sender.sendAsync("GET", baseUrl+ "/getUserElections", JSON.stringify(temp), function(res){
			
			
			
		});
		
	}else {
		//window.alert("User account undifined");
		notification.innerHTML = "no user account logged in, failed to load elections";
		return;
	}	
	
	
}

function createPoll(){
	contentContainer.innerHTML = "";
	contentContainer.appendChild(notification);
	
	
}


function jumpToLogin() {
	window.location.href = "../../index.html";
}
//---------------------------internal use function----------------------------------------------------

function isSessionStorageEmpty() {
	
	if(sessionStorage.userName !== "" && sessionStorage.userName != null){
	 return false;
	}else{
		return true;
	}
	
	
}

