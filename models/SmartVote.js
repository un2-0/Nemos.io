function SmartVote() {

	var COMMITTING = true;
	
	svApi = new SmartVoteAPI();

	this.handle = function(httpReq) {
		Println("Receiving");
		var urlObj = newtork.parseUrl(httpReq);
		
		//Error 400 bad request
		if (urlObj.error !== "") {
			return null;
		}
		var resp = hFunc(urlObj, httpReq);
		Println("REPONSE OBJECT: " JSON.stringify(resp));
		
		//Weak check, but this is clearly not a valid reponse.
		if (typeof(resp) !== "object" || resp.Body === undefined
				|| resp.Header === undefined || resp.Status === undefined) {
			return null;
		}
		return resp;
	}
	
	function doPoll(method, body) {
		if (method === "POST") {
			var nameObj = JSON.parse(body);
			var hash = 
			if (COMMITTING) {
				monk.Commit();
			}
			return network.getHttpResponseJSON(hash);
		}
	}
	
	this.init = function() {
		svApi.init();
	}
};

// Initialization
var sv = new SmartVote();
Println("Starting SmartVote");
sv.init();

network.registerIncomingHttpCallback(sv.handle);
Println("SmartVote Initialized");