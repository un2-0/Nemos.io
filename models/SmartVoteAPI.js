/**
 * The SmartVoteAPI class
 */
function SmartVoteAPI() {

	var dougAddr = RootContract;
	var plfAddr = "";
	var monkAddr = "";
	var mysubs = [];
	
	var txData = {};
	
	this.createPoll = function(ipfsdata, opnum, opentime, closetime, crtusrname, plname) {
		Println("Adding file to ipfs.");
		var hash = writeFile(ipfsdata);
		if (hash === "") {
			Println("Error when adding file to ipfs.");
			return "0x0";
		}
		return this.postPid(opnum, hash, opentime, closetime, crtusrname, plname);
	}
	
	this.postPid = function(opnum, hash, opentime, closetime, crtusrname, plname) {
		var txData = [];
		txData.push("init");
		txData.push(opnum);
		txData.push(hash);
		txData.push(opentime);
		txData.push(closetime);
		txData.push(Date());
		txData.push(crtusrname);
		txData.push(plname);
		var hash = sendMsg(plAddr, txData);
		return hash;
	}
	
	this.setStatus = function(plname, status) {
		var txData = [];
		txData.push("setstatus");
		txData.push(status);
		var hash = senMsg(plname2Addr(plname), txData);
		return hash;
	}
	
	this.checkStatus = function(plname) {
		return esl.single.Value(plname2Addr(plname), StringToHex("status"));
	}
	
	this.refreshPoll = function(plname) {
		plAddr = plname2Addr(plname);
		var opentime = esl.single.Value(plAddr, StringToHex("opentime"));
		var closetime = esl.single.Value(plAddr, StringToHex("closetime"));
		var status = esl.single.Value(plAddr, StringToHex("status"));
		var crttime = Date();
		if (crttime < closetime && crttime > opentime && status == 0) {
			setStatus(plname, 1);
		}
		else if (status == 1){
			setStatus(plname, 0)
		}
	}
	
	this.vote = function(plname, opnum) {
		if (checkStatus(plname) == 1) {
			var txData = [];
			txData.push("vote");
			txData.push(opnum);
			var hash = senMsg(plname2Addr(plname), txData);;
			return hash;
		}
		return null;
	}
	
	function plname2Addr(plname) {
		return esl.kv.Value(plfAddr, sutil.StringToHex("polls", plname));
	}
	
	this.init = function() {
		Println("Initializing SmartVote");
		// Start subscribing to tx events.
		Println("DOUG address: " + dougAddr);
		plfAddr = esl.ll.Main(dougAddr, StringToHex("DOUG"), StringToHex("pollfactory"));
		Println("plfAddr: " + plfAddr);
		monkAddr = "0x" + monk.ActiveAddress().Data;
		Println("monkAddr: " + monkAddr);
	}
};
