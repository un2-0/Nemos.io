VERSION=${VERSION:=1.4.2}
OS=${OS:=linux}
ARCH=${ARCH:=amd64}
tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
sleep 30

export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

sudo apt-get install jq git mercurial libgmp3-dev curl vim

go get github.com/eris-ltd/decerver/cmd/decerver
go install github.com/eris-ltd/decerver/cmd/decerver

go get github.com/eris-ltd/epm-go/cmd/epm

go get github.com/ipfs/go-ipfs/cmd/ipfs

cd ~/
mkdir .decerver
cd .decerver
mkdir dapps
cd dapps
git clone http://github.com/e-movement/smartvote SmartVote

cd ~/.decerver/dapps/SmartVote
chmod -x ./start.sh
chmod -x ./startipfs.sh
chmod -x ./startbrowser.sh
./start.sh
