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
		
		var path = httpReq.URL.Path;
		var opt = path.slice(1).split('/')[2];
		var rq = httpReq.URL.RawQuery;
		Println("opt: " + opt);
		doPoll(opt, rq);
		return ;
	}
	
	function doPoll(opt, rq) {
		var hash = "0x0";
		svApi.createPoll("1")
		if (COMMITTING) {
			monk.Commit();
		}
		return network.getHttpResponseJSON(hash);
	}

	this.test = function() {
		var plAddr = svApi.createPoll("myFirstPoll");
		if (COMMITTING) {
			monk.Commit();
		}
		aaa = svApi.test("myFirstPoll");
		Println("8888888888888888888\n" + aaa);
		Println("8888888888888888888\n" + sutil.hexToString(svApi.test1(aaa)));
	}
	
	this.init = function() {
		svApi.init();
	}
};

// Initialization
var sv = new SmartVote();
Println("Starting SmartVote");
sv.init();
sv.test();
network.registerIncomingHttpCallback(sv.handle);
Println("SmartVote Initialized");
