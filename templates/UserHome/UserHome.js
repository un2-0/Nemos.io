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

function showPolls(){
	 
	contentContainer.innerHTML = "";
	
	
	
	//for test
	loadBasicPollInformation("view");
	
	if(isSessionStorageEmpty() == false){
		
		temp = {username: sessionStorage.userName};
		
		notification.innerHTML = "loading elections of current user...";
		
		loadBasicPollInformation("view");
		
		sender.sendAsync("POST", baseUrl+ "/getUserPolls", JSON.stringify(temp), function(res){
			
			
			
		});
		
	}else {
		//window.alert("User account undifined");
		contentContainer.appendChild(notification);
		notification.innerHTML = "no user account logged in, failed to load elections";
		return;
	}	
	
	
}

function createPoll(){
	
	contentContainer.innerHTML = "";
	
	
	
	//for test
	loadBasicPollInformation("create");
	
	
	if (isSessionStorageEmpty() == false) {
		contentContainer.innerHTML = "";
	
		loadBasicPollInformation("create");
		
		loadPollModules();
		
		temp = {username: sessionStorage.userName};
		
		sender.sendAsync("POST", baseUrl+ "/createPoll", JSON.stringify(temp), function(res){
			
			
			
		});
		
	} else {
		contentContainer.appendChild(notification);
		//notification.innerHTML = "no user account logged in, failed to create poll";
	}
	
	
	
}


function jumpToLogin() {
	window.location.href = "../../index.html";
}


