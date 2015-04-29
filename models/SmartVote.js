function SmartVote() {

	var COMMITTING = true;

	var handlers = {};
	svApi = new SmartVoteAPI();

	// Used to handle all incoming requests. It is set as the callback for
	// incominghttp requests. It parses the request URL into an object, then
	// pass that object into the appropriate sub handler (should one exist).
	// Sub handlers needs to return a response object.
	this.handle = function (httpReq) {
		Println("Receiving request...");
		// Println("http request:");
		// Println(typeof (httpReq));    // object
		// Println(httpReq);
		// The structure of httpReq: 
		// httpReq = {
		//    Method:GET     // or POST
		//    Host:localhost:3000
		//    Header:{...}
		//    Body:     // query goes here if POST
		//    URL:{
		//        User:<nil>
		//        Host:
		//        Path:/apis/SmartVote/getContractAddress
		//        RawQuery:contractName=DOUG     // empty if POST
		//        Fragment:
		//        Scheme:
		//        Opaque:
		//    }
		// }

		var urlObj = network.parseUrl(httpReq);
		// Println(urlObj);
		// The structure of urlObj
		// urlObj = {
		//     path:[getContractAddress]
		//     options:{contractName:DOUG}     // empty if POST
		//     error:
		// }

		// Error 400 bad request
		if (urlObj.error !== "") {
			return null;
		}

		var res = urlObj.path[0].split("&")[0];
		Println("res       " + res);
		var hFunc = handlers[res];
		// Return an error.
		if (typeof (hFunc) !== "function") {
			network.getHttpResponse(400,{},"Bad request: no resource named: " + res + ".");
		}
		var resp = hFunc(urlObj);
		Println("resp:          " + resp);

        // Weak check, but this is clearly not a valid response.
        if (typeof (resp) !== "object" || resp.Body === undefined
                || resp.Header === undefined || resp.Status === undefined) {
            return null;
        }

		if (JSON.stringify(resp).length < 10000) {
			Println("RESPONSE OBJECT: " + JSON.stringify(resp));
		} else {
			Println("RESPONSE OBJECT: " + JSON.stringify(resp).substr(0, 10000) + " ...{truncated}");
		};

		return resp;
	}

	handlers.showVotings = function(urlObj) {
		return getPolls();
	}

	handlers.addVt = function(urlObj) {
		return createPollAccount(urlObj.path.toString().split("&")[1], urlObj.path.toString().split("&")[2], urlObj.path.toString().split("&")[3], urlObj.path.toString().split("&")[4], urlObj.path.toString().split("&")[5], urlObj.path.toString().split("&")[6], urlObj.path.toString().split("&")[7]);
	}

	handlers.getOpnum = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getOpnum(urlObj.path.toString().split("&")[1]));
	}

	handlers.getDescription = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getDescription(urlObj.path.toString().split("&")[1]));
	}

	handlers.getOpentime = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getOpentime(urlObj.path.toString().split("&")[1]));
	}

	handlers.getClosetime = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getClosetime(urlObj.path.toString().split("&")[1]));
	}

	handlers.getCreatetime = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getCreatetime(urlObj.path.toString().split("&")[1]));
	}

	handlers.getCreatorusrname = function(urlObj, httpReq) {
		return network.getHttpResponseJSON(svApi.getCreatorusrname(urlObj.path.toString().split("&")[1]));
	}

	handlers.showStat = function(urlObj, httpReq) {
		return getStat(urlObj.path.toString().split("&")[1]);
	}

	handlers.vote = function(urlObj, httpReq) {
		return vote(urlObj.path.toString().split("&")[1], urlObj.path.toString().split("&")[2]);
	}

	// for testing
	handlers.getContractAddress = function(urlObj) {
	    Println(JSON.stringify(urlObj));
	    // parse parameters
	    
	    // get the wanted values
	    
	    // create the response JSON object
	    var response;
	    return network.getHttpResponseJSON(response);
	}

	// functions to talk with contracts
	function getPolls() {
		return network.getHttpResponseJSON(svApi.showPolls());
	}

	function createPollAccount(plname, opnum, description, opentime, closetime ,createtime, creatorusrname) {
		svApi.createPollAccount(plname);
		if (COMMITTING) {
			monk.Commit();
		}
		svApi.initPoll(plname, opnum, description, opentime, closetime ,createtime, creatorusrname);
		if (COMMITTING) {
			monk.Commit();
		}
		svApi.setStatus(plname, 1);
		if (COMMITTING) {
			monk.Commit();
		}
		return network.getHttpResponseJSON("success");
	}

	function getStat(plname) {
		return network.getHttpResponseJSON(svApi.getStat(plname));
	}

	function vote(plname, opnum) {
		var hash = svApi.vote(plname, opnum);
		if (COMMITTING) {
			monk.Commit();
		}
		return network.getHttpResponseJSON(hash);
	}

	this.testshowVotings = function() {
		return svApi.showPolls();
	}

	this.test = function() {
		var plAddr = svApi.createPollAccount("myFirstPoll");
		if (COMMITTING) {
			monk.Commit();
		}
		Println("8888888888888888888\n" + sutil.hexToString(svApi.test1("myFirstPoll")));
	}

	this.test1 = function() {
		var plAddr = svApi.createPollAccount("mySecondPoll");
		if (COMMITTING) {
			monk.Commit();
		}
		Println("9999999999999999999\n" + sutil.hexToString(svApi.test1("mySecondPoll")));
	}

	this.test2 = function() {
		var plname = "myFirstPoll";
		svApi.createPollAccount(plname);
		if (COMMITTING) {
			monk.Commit();
		}
		svApi.initPoll(plname, 20, "2222", "3333", "444444" ,"55555555", "6666666666");
		if (COMMITING) {
			monk.Commit();
		}
		println("ccccccccccccccccc" + svApi.test1(plname));
	}

	this.test3 = function() {
		var n = 20;
		var s = n.toString(16);
		Println("aaaaaaaaaaaaaa" + n);
		Println("vvvvvvvvvvvvvvvv" + s);
	}

	this.init = function() {
		svApi.init();
	}

};

// Initialization
var sv = new SmartVote();
Println("Starting SmartVote");
sv.init();
//sv.test();
//sv.test1();
//sv.test3();
//sv.testshowVotings();
//sv.test2();
//sv.test3();
network.registerIncomingHttpCallback(sv.handle);
Println("SmartVote Initialized");