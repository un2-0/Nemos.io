function SmartVote() {

	var COMMITTING = true;
	
	var method = "";
	var body = "";
	
	svApi = new SmartVoteAPI();

	this.handle = function(httpReq) {
		Println("Receiving");
		var urlObj = network.parseUrl(httpReq);
		
		//Error 400 bad request
		if (urlObj.error !== "") {
			return null;
		}
<<<<<<< HEAD
=======
		var resp = hFunc(urlObj, httpReq);
		Println("REPONSE OBJECT: " + JSON.stringify(resp));
>>>>>>> origin/master
		
		var path = httpReq.URL.Path;
<<<<<<< HEAD
		var opt = path.slice(1).split('/')[2];
		var rq = httpReq.URL.RawQuery;
		Println("opt: " + opt);
		doPoll(opt, rq);
		return ;
=======
		var pathSlice = path.slice(1).split('/'); //**************
		Println("111111111111111111" + pathSlice);
		return resp;
>>>>>>> origin/master
	}
	
	function doPoll(opt, rq) {
		if (method === "POST") {
			var nameObj = JSON.parse(body);
			var hash = "0x0";
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
