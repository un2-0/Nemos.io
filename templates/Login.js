var	sender = new HttpAPI();
baseUrl = "/apis/SmartVote";

function login(){
	
	var form = document.getElementById("loginForm");
	var userName = document.getElementById("username");
	var passWord = document.getElementById("password");
	

	if (userName.value == "" || userName.value == null) {
		window.alert("please enter the username");
		form.reset();
	} else if (passWord.value == "" || passWord.value == null) {
		window.alert("please enter your password");
		form.reset();
	} 
	

	var userinfo = { username : userName , password : passWord };
	
	
	/*this request "Login" requires data below in http response: 
	 * 
	 *
	*/
	sender.sendAsync("GET", baseUrl+ "/Login&", null, function(res){ 
		
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