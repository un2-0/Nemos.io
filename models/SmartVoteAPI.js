/**
 * The SmartVoteAPI class
 */
function SmartVoteAPI() {
    this.handle = function (httpRequest) {
        Println("in handling");
        //var url_obj = network.parseURL(http_request);
        //if (url_obj.error != "") {
        //	return null;
        //}
        var path = httpRequest.URL.Path;
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
        } else if (method === "addVoting") {
            Println("in server: adding")
            var votingName = httpRequest.URL.RawQuery.split('=')[1];
            Println("in server: " + votingName);
            var txData = [];
            txData.push(method);
            txData.push(votingName);
            Println(txData);
            monk.Msg(RootContract, txData);
            monk.Commit();
            Println("in server: finished");
            return null;
        } else if (method === "getVoting") {
            var voting = "{" +
            "\"name\" : \"Default\"," +
            "\"candidates\" : [\"Micky\", \"McDonald\", \"Goofy\"]" +
            "}";
            Println(voting);
            return {
                "Status" : 200,
                "Header" : {},
                "Body" : voting
            };
        }
    };
}

function getVtNumFromBlockchain() {
    //var txData = [];
    //txData.push("getVtNum");
    //monk.Msg(RootContract, txData);
    //monk.Commit();
    Println(RootContract);

    var sa = monk.StorageAt(RootContract, "0x0");
    Println(sa);
    return sa.Data;
}