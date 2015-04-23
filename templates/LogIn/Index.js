/**
 * 
 */
var	sender = new HttpAPI();
baseUrl = "/apis/SmartVote";

function login_as_organiser(){
	/*this request "organiserLogin" require a JSON string response which contains:
	 * "process" : createNew (if created a new organiser account for this computer)
	 *			   registered (if this computer has been registered as organiser)
	 *
	 *	
	
	*/
	var result = sender.send("GET", baseUrl+ "/organiserLogin&", null);
	
	result = JSON.parse(result);
	
	if(result.process === "createNew" && result.res === "success"){
		window.alert("You haven't registerd as organiser, created a new account for you");
		
	
	} else if (result.process === "createNew" && result.res === "fail"){
		window.alert("You haven't registerd as organiser, failed to create a new account for you");
	} else if (result.process === "registered" && result.res === "success") {
		
	} else if (result.process === "registered" && result.res === "fail") {
		window.alert("fail to log you in");
	} else {
		window.alert("fail to log you in, for unknown reason.");
	}
	
	
	var fName = document.getElementById('filenameGet').value;
	sender.sendAsync("GET", baseUrl + "/files/" + fName, null, function(re) {
		if (re.status === 200) {
			console.log(re);
			var body = re.response;
			body = JSON.parse(body);
	        document.getElementById('output').value = decodeURI(body.data);
	    } else {
			document.getElementById('output').value = "File not found";
		}
	});
};