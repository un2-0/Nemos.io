var httpApi;
var baseUrl;

window.onload = init;

function init() {
    baseUrl = "/apis/SmartVote";
    httpApi = new HttpAPI();
    var createBtn = document.getElementById("createBtn");
    createBtn.onclick = createPoll;
    showVotings();
    //document.getElementById("addCandiBtn").onclick = addCandidate;

    //document.getElementById("showBtn").onclick = showDefaultVoting;
}
/*
function showDefaultVoting() {
    var voting = httpApi.send("GET", baseUrl + "/getVoting?votingName=default", null)
    //window.alert("before parsing");
    voting = JSON.parse(voting);
    //var voting = jQuery.parseJSON(ret);
    //window.alert("done");
    var showDiv = document.getElementById("show_place");
    var candNum = voting.candidates.length;

    //Create and append a form
    var form = document.createElement("FORM");
    showDiv.appendChild(form);

    //Create and append the options
    for (var i = 0; i < candNum; i++) {
        var radio = document.createElement("INPUT");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", voting.name);
        radio.id = voting["candidates"][i];

        var label = document.createElement("LABEL");
        label.appendChild(document.createTextNode(voting["candidates"][i]));
        form.appendChild(radio);
        form.appendChild(label);
        form.appendChild(document.createElement("BR"));
    }

    var submitBtn = document.createElement("BUTTON");
    submitBtn.appendChild(document.createTextNode("Vote"));
    showDiv.appendChild(submitBtn);
}
*/

function createPoll() {
    //document.getElementById("createBtn").disabled = true;
    var opnum = escape(document.getElementById("opnum").value);
    var description = escape(document.getElementById("description").value);
    var opentime = new Date().toLocaleDateString();
    var closetime = escape(document.getElementById("endTime").value)
    var createtime = new Date().toLocaleDateString();
    var creatorusrname = escape(document.getElementById("initiatorName").value);
    var votingName = escape(document.getElementById("newVotingName").value);
    httpApi.send("GET", baseUrl + "/addVt&" + votingName + "&" + opnum + "&" + description + "&" + opentime + "&" + closetime + "&" + createtime + "&" + creatorusrname, null);
    window.location.reload();
}
/*
function addCandidate() {
    var candiTable = document.getElementById("candiTable");
    var newCandiNum = candiTable.rows.length + 1;
    var newCandiRow = candiTable.insertRow(candiTable.rows.length);
    newCandiRow.id = "candiRow" + newCandiNum;
    //newCandiRow.class = "candiRow";
    
    // insert and set up the left cell
    var leftCell = newCandiRow.insertCell(0);
    var label = document.createElement("LABEL");
    label.innerHTML = "Candidate " + newCandiNum;
    label.id = "candiLabel" + newCandiNum;
    label.htmlFor = "candi" + newCandiNum;
    leftCell.appendChild(label);
    
    // insert and set up the right cell
    var rightCell = newCandiRow.insertCell(1);
    var input = document.createElement("INPUT");
    input.id = "candi" + newCandiNum;
    input.type = "text";
    input.name = input.id;
    rightCell.appendChild(input);
}*/

/**
 * Get the number of on-going votings. if successful, call
 * <code>updateVotingNumInPage</code>.
 */
/*
function getVotingNum() {
    var request = createRequest();
    if (request == null) {
        window.alert("Unable to create a request!");
        return;
    }
    var url = baseUrl + "/getVtNum";
    request.open("GET", url, true);
    request.onsteadychange = updateVotingNumInPage;
    request.send(null);
}

function updateVotingNumInPage() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("voting_num").innerHTML = this.responseText;
    }
}
*/
function showVotings() {
    var votings = httpApi.send("GET", baseUrl + "/showVotings", null);
    if (votings != 0) {
        var vtlist = votings.split('"').join("");
        vtlist = vtlist.split(";");
        var vtlen = vtlist.length;
        var str ="";
        for (var i = 0; i < vtlen; i++) {
            document.getElementById('ongoingvoting').innerHTML = document.getElementById('ongoingvoting').innerHTML + '<p>' + vtlist[i] +'</p>';
        }
    }
/*
    var container = document.getElementById("ongoingvoting").innerHTML;
    var np = document.createElement("p");
    var txt = document.createTextNode(str);
    np.appendChild(txt);
    document.body.appendChild(np);
    container.insertBefore(np, container.fisrtChild);
*/
    
//the scripts below were from responding html files    
    $(function() {
		var match = document.cookie.match(new RegExp('color=([^;]+)'));
		if (match)
			var color = match[1];
		if (color) {
			$('body').removeClass(function(index, css) {
				return (css.match(/\btheme-\S+/g) || []).join(' ')
			})
			$('body').addClass('theme-' + color);
		}
		$('[data-popover="true"]').popover({
			html : true
		});
	});
    
    $(function() {
		var uls = $('.sidebar-nav > ul > *').clone();
		uls.addClass('visible-xs');
		$('#main-menu').append(uls.clone());
	});
    
    $("[rel=tooltip]").tooltip();
	$(function() {
		$('.demo-cancel-click').click(function() {
			return false;
		});
	});
}
