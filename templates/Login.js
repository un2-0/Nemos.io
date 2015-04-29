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
	
	var userinfo = { username : userName.value , password : passWord.value };
	console.log(userinfo);
	
	
	//for test
	//Note that: browser in Eclipse doesnt support session storage,plz test in chrome
	sessionStorage.userName = userName.value;
	window.alert("userinfo.username:"+userinfo.username +"   userinfo.password: "+userinfo.password+"   username in session: "+ sessionStorage.userName);
	window.location.href = "templates/UserHome/UserHome.html";
	
	
	
	/*Data in "Login" request:
	 *  "username": username
	 * 	"password": password
	 * 
	 * Data should be in "Login" response: 
	 *  "result" =  "success"(if username and password all good)
	 *  			"userDoesntExist" (if user id doesnt exist)
	 *  			"wrongPassWord" (if user id exist but the password is wrong)
	*/
	sender.sendAsync("GET", baseUrl+ "/Login&", JSON.stringify(userinfo), function(res){ 
		
		if (res.status == 200) {
			console.log(res);
			var body = res.response;
			
			body = JSON.parse(body);
			
			if (body.result === "success") {
				
				sessionStorage.userName = userName.value;
				

				window.location.href = "templates/UserHome/UserHome.html";
				
			} else if (body.result === "userDoesntExist") {
				
				window.alert("Sorry, the user name does not exist");
				form.reset();
				
			} else if (body.result === "wrongPassWord"){
				
				window.alert("Sorry, your password is wrong");
				form.reset();
				
			} else {
				
				window.alert("bad response");
			}
	        
	    } else {
			window.alert("failed to login");
		}
	});
	
}

function jumpToRegistration(){
	window.location.href = "templates/Registration/Register.html";
}
