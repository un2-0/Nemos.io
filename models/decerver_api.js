// Do a transaction and return the tx hash.
function sendMsg(addr, txIndata) {
	Println("Sending message");
	for (var i = 0; i < txIndata.length; i++) {
		txIndata[i] = txIndata[i].trim();
	}
	Printf("TxData: %v\n", txIndata);
	var rData = monk.Msg(addr, txIndata);
	if (rData.Error !== "") {
		Println(rData.Error);
		return "";
	}
	return rData.Data.Hash;
};

// "StorageAt". Simplify storage access. Not gonna pass errors to UI.
function SA(accAddr, sAddr) {
	var sObj = monk.StorageAt(accAddr, sAddr);
	if (sObj.Error !== "") {
		Printf("Error when accessing storage for contract '%s' at address '%s': %s\n",
				accAddr, sAddr, sObj.Error);
		return "0x0";
	}
	return sObj.Data;
};

function writeFile(data) {
	var hashObj = ipfs.PushFileData(data);
	if (hashObj.Error !== "") {
		return "";
	} else {
		Println("Wrote file. Hash: " + hashObj.Data);
		// This would be the 32 byte hash (omitting the initial "1220").
		return "0x" + hashObj.Data.slice(6);
	}
};

// Takes the 32 byte hash. Prepends "1220" to create the full hash.
function readFile(hash) {
	var fullHash = "1220" + hash.slice(2);
	var fileObj = ipfs.GetFile(fullHash, false);

	if (fileObj.Error !== "") {
		return "";
	} else {
		// This would be the file data as a string.
		return fileObj.Data;
	}
};

function readFileRaw(fullHash) {
	var fileObj = ipfs.GetFile(fullHash, false);

	if (fileObj.Error !== "") {
		return "";
	} else {
		// This would be the file data as a string.
		return fileObj.Data;
	}
};
