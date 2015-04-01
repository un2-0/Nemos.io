/*
 * Assume the url is in the form 'http://localhost:3000/smartvote/method?param1=val1&...'
 */

// the SmartVoteAPI class
function SmartVoteAPI() {
	this.handle = function (http_request) {
		Println("in handling");
		//var url_obj = network.parseURL(http_request);
		//if (url_obj.error != "") {
		//	return null;
		//}
		var path = http_request.URL.Path;
		Println(path);
		var path_split = path.slice(1).split('/');
		var method = path_split[2];
		if (method === "get_vtnum") {
			var vtnum = get_vtnum_from_blockchain();
			return {
				"Status" : 200,
				"Header" : {},
				"Body" : vtnum
			};
		}
		
	};
}

function get_vtnum_from_blockchain() {
		//var txData = [];
		//txData.push("getvtnum");
		//monk.Msg(RootContract, txData);
		//monk.Commit();
		var sa = monk.StorageAt(RootContract, '0x0');
		Println(sa);
		return sa.Data;
	}