var	sender = new HttpAPI();
baseUrl = "/apis/SmartVote";

function login_as_organiser(){
	/*this request "organiserLogin" requires a piece of data "process" in http response which contains:
	 * 
	 * "process" : createNew (if created a new organiser account for this computer)
	 *			   registered (if this computer has been registered as organiser)
	*/
	
	sender.sendAsync("GET", baseUrl+ "/organiserLogin&", null, function(res){ 
		
		if (res.status === 200) {
			console.log(res);
			var body = res.response;
			body = JSON.parse(body);
			if (body.process === "createNew") {
				window.alert("you have not registered as organiser, created an account for you");
				window.location.href = "./templates/OrganizerHome/OrganizerHome.html";
			} else if (body.process === "registered"){
				window.alert("account detected, loging you in");
				window.location.href = "./templates/OrganizerHome/OrganizerHome.html";
			} else {
				window.alert("bad response, fail to log in");
			}
	        
	    } else {
			window.alert("failed to login");
		}
	});
	
}


function login_as_Voter(){
	/*this request "voterLogin" requires a piece of data "process" in http response which contains:
	 * 
	 * "process" : createNew (if created a new voter account for this computer)
	 *			   registered (if this computer has been registered as voter)
	*/
	
	sender.sendAsync("GET", baseUrl+ "/VoterLogin&", null, function(res){ 
		
		if (res.status === 200) {
			console.log(res);
			var body = res.response;
			body = JSON.parse(body);
			if (body.process === "createNew") {
				window.alert("you have not registered as Voter, created an account for you");
				window.location.href = "./templates/VoterHome/VoterHome.html";
			} else if (body.process === "registered"){
				window.alert("account detected, loging you in");
				window.location.href = "./templates/VoterHome/VoterHome.html";
			} else {
				window.alert("bad response, fail to log in");
			}
	        
	    } else {
			window.alert("failed to login");
		}
	});
	
}	
	
	
	
