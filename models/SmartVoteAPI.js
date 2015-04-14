/**
 * The SmartVoteAPI class
 */
function SmartVoteAPI() {

	var dougAddr = RootContract;
	var plfAddr = "";
	var monkAddr = "";
	var mysubs = [];
	
	var txData = {};

	// Codes for polling
	// 0 - non existing
	// 1 - pending
	// 2 - failed
	// 3 - succeeded
	this.checkTx = function(txHash){
		Println("CHECKING HASH: " + txHash);
		var txObj = txData[txHash];
		if(txObj === undefined){
			return 0;
		}
		// failedF
		if (txObj.status === 2){
			delete txData[txHash];
		} else if (txObj.status === 4){
			delete txData[txHash];
		}
		return txObj.status;
	}

	this.newTxObj = function(){
		return {"status" : 0 };
	}

	this.statUpdateBlock = function(event){
		var blockObj = event.Resource;
		if(blockObj.Transactions.length === 0){
			return;
		}
		var txs = blockObj.Transactions;
		for(var i = 0; i < txs.length; i++){
			var tx = txs[i];
			var hash = '0x' + tx.Hash;
			var txObj = txData[hash];
			if(txObj !== undefined && txObj.status == 3){
				txObj.status = 4;
			}
			if(hash === accTx){
				myaccAddr = esl.kv.Value(afAddr, StringToHex("accounts"), myMonkAddr);
				Println("Updating myaccAddr: " + myaccAddr);
				accTx = "";
			}
		}
	}

	this.statUpdatePost = function(event){
		var hash = "0x" + event.Resource.Hash;
		Println("Post tx received: " + hash);
		var txObj = txData[hash];
		if(txObj !== undefined && txObj.status < 3){
			txObj.status = 3;
		}

	}

	this.statUpdateFail = function(event){
		var txObj = txData[event.Resource.Hash];
		if(txObj !== undefined){
			txObj.status = 2;
		}
	}

	// functions for adding new type of txs
	this.trackTx = function(txHash){
		Println("Added hash for tracking: " + txHash.slice(0,6) + "...");
		var txObj = this.newTxObj();
		txObj.status = 1;
		txData[txHash] = txObj;
		Println("Added tx data");
	}
	
	this.createPoll = function(plname) {
		var txData = [];
		Println("Creating poll in blockchain.");
		txData.push("create");
		txData.push(plname);
		var hash = sendMsg(plfAddr, txData);
		return hash;
	}

	this.initPoll = function() {
		Println("Adding file to ipfs.");
		var hash = writeFile(ipfsdata);
		if (hash === "") {
			Println("Error when adding file to ipfs.");
			return "0x0";
		}
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
			var hash = senMsg(plname2Addr(plname), txData);
			return hash;
		}
		return null;
	}
	
	function plname2Addr(plname) {
		return esl.kv.Value(plfAddr, sutil.stringToHex("polls", plname));
	}

	// No websockets running here, meaning there's only one possible sub from this runtime.
	this.sub = function() {
		events.subscribe("monk","newBlock","", this.statUpdateBlock, "does_not_matter_since_not_websocket");
		events.subscribe("monk","newTx:post","", this.statUpdatePost, "does_not_matter_since_not_websocket");
		events.subscribe("monk","newTx:pre:fail","", this.statUpdateFail, "does_not_matter_since_not_websocket");
		events.subscribe("monk","newTx:post:fail","", this.statUpdateFail, "does_not_matter_since_not_websocket");
	}

	// No websockets running here, meaning there's only one possible sub from this runtime.
	function unsub(){
		events.unsubscribe("monk","newBlock", "does_not_matter_since_not_websocket");
		events.unsubscribe("monk","newTx:post","does_not_matter_since_not_websocket");
		events.unsubscribe("monk","newTx:pre:fail","does_not_matter_since_not_websocket");
		events.unsubscribe("monk","newTx:post:fail","does_not_matter_since_not_websocket");
	}

	this.init = function() {
		Println("Initializing SmartVote");
		// Start subscribing to tx events.
		//this.sub();
		Println("DOUG address: " + dougAddr);
		plfAddr = esl.ll.Main(dougAddr, sutil.stringToHex("DOUG"), sutil.stringToHex("pollfactory"));
		Println("plfAddr: " + plfAddr);
		monkAddr = "0x" + monk.ActiveAddress().Data;
		Println("monkAddr: " + monkAddr);
	}

	this.test = function(plname) {
		var aaaaa = esl.ll.Main(plfAddr, sutil.stringToHex("plnames"), sutil.stringToHex(plname));
		var bbb = esl.kv.Value(plfAddr, sutil.stringToHex("polls"), aaaaa);
		return bbb;
	}

	this.test1 = function(plAddr) {
		Println("plfAddr: \n" + plfAddr);
		return esl.single.Value(plAddr, sutil.stringToHex("plname"));
	}
};
