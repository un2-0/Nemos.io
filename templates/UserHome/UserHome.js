

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
	
	//showDefaultContent();
	
	
	
	sender.sendAsync("GET", baseUrl+ "/organiserLogin&", null, function(res){ 
		
		if (res.status === 200) {
			console.log(res);
			
			var body = res.response;
			body = JSON.parse(body);
			document.getElementById("Welcomer").innerHTML = body.voterAddr;
			
			for (var i = 0; i < body.elections.length; i++) {
				
			}
			
	        
	    } else {
			window.alert("failed to get elections");
		}
	});
		
}

function showElections(){
	document.getElementById("contentContainer").innerHTML = "";
	
}

function createPoll(){
	document.getElementById("contentContainer").innerHTML = "";
}


function jumpToLogin() {
	window.location.href = "../../index.html";
}
