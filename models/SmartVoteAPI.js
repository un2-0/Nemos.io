/*
 * Assume the url is in the form 'http://localhost:3000/smartvote/method?param1=val1&...'
 */

// the SmartVoteAPI class
function SmartVoteAPI() {
	this.handle = function (httpRequest) {
		Println("in handling");
		//var url_obj = network.parseURL(http_request);
		//if (url_obj.error != "") {
		//	return null;
		//}
		var path = http_request.URL.Path;
		Println(path);
		var pathSplit = path.slice(1).split('/');
		var method = pathSplit[2];
		if (method === "getVtNum") {
			var vtnum = getVtNumFromBlockchain();
			return {
				"Status" : 200,
				"Header" : {},
				"Body" : vtnum
			};
		}
		
	};
}

function getVtNumFromBlockchain() {
		//var txData = [];
		//txData.push("getvtnum");
		//monk.Msg(RootContract, txData);
		//monk.Commit();
		Println(RootContract);
		var sa = monk.StorageAt(RootContract, '0x0');
		Println(sa);
		return sa.Data;
	}