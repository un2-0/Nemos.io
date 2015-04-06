function SmartVote() {
    Println("Creating SmartVote.");

    var api = new SmartVoteAPI();

    this.run = function() {
        Println("Starting SmartVote.")

        // overwrite the new incoming http callback
        network.incomingHttpCallback = function (request) {
            return api.handle(request);
        }

        Println("SmartVote started.");
    }

}

// start the dapp
new SmartVote().run();