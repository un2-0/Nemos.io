
window.onload(loadInformation());

function loadInformation(){
	//window.alert("initialing");

	var elections = document.getElementById("VoterDisplayElection");
	var out = "";
	
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



function jumpToLogin() {
	window.location.href = "../../index.html";
}
