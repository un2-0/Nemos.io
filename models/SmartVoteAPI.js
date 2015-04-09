/**
 * The SmartVoteAPI class
 */
function SmartVoteAPI() {

	var dougAddr = RootContract;
	var plAddr = "";
	var plfAddr = "";
	var monkAddr = "";
	
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
		txData.push(crtusrname);
		txData.push(plname);
		var hash = sendMsg(plAddr, txData);
		return hash;
	}
	
	this.pollOn = function() {
		txData.push("setstatus");
		txData.push(1);
		var hash = sendMsg(plAddr, txData);
		return hash;
	}
	
	this.pollOff = function() {
		txData.push("setstatus");
		txData.push(0);
		var hash = sendMsg(plAddr, txData);
		return hash;
	}
	
	function plnameToAddr(plname) {
		return esl.kv.Main(plfAddr, sutil.stringToHex("polls"), monkAddr);
	}
}£»