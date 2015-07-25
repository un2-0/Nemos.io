## Nemos -- A Distributed Voting System

A voting system which uses smart contracts to structure the application's logic, and a distributed file store system to share the content between application users.

## Installation

### Warning

This distributed application (DApp) is ready for wider beta testing.

Please note, however, that the blockchain it uses may have to be reset from time to time. We do not currently have a backup/export/import functionality for smart contract housed information (yet), so at this time when the blockchain resets all data are lost and will have to be readded.

## Installation
The current SmartVote only supoort Ubuntu.

For 64 bit machine, download [install64.sh](https://github.com/E-Movement/SmartVote/blob/master/install64.sh) and run it in the terminal:

```bash
sudo sh ./install64.sh
```

For 32 bit machine, download [install32.sh](https://github.com/E-Movement/SmartVote/blob/master/install32.sh) and run it in the terminal:

```bash
sudo sh ./install32.sh
```

*It may take a while, please be patient.

### Running the app

Connecting to an existing blockchain:

```bash
./start.sh
```

where [start.sh](https://github.com/E-Movement/SmartVote/blob/master/start.sh) is in the folder $HOME/.eris/dapps/SmartVote

Creating a new blockchain:

```bash
./newBC.sh
```

where [newBC.sh](https://github.com/E-Movement/SmartVote/blob/master/spec/newBC.sh) is in the folder $HOME/.eris/dapps/SmartVote/spec .

When the DApp is running, open [http://localhost:3000/SmartVote/](http://localhost:3000/SmartVote/) in a browser.

## FAQ

1.What can I do if displaying "Ref SmartVote already exists"?

Use "epm rm SmartVote" to delete the current blockchain.

2.What can I do if displaying "resource temporarily unavailable"?

Use "(sudo) pkill decerver" to terminate the process.

3.Why does it say "epm not found" or "decerver not found"?

Because GOROOT, GOPATH and PATH will not be saved in bash automatically, every time the terminal is lauched and decerver or epm needs to be run in terminal, you need to do the path setting and if you use the default setting for Go, which is as the following:

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

Or the above setting can be saved in .bashrc in home folder to avoid the input every time launching the terminal.

## License

GPL. See LICENSE.txt file.
