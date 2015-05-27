VERSION=${VERSION:=1.4.2}
OS=${OS:=linux}
ARCH=${ARCH:=amd64}
tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
sleep 30

if [ -z "$GOROOT" ] && [ -z "$GOPATH" ]
then
echo ""
echo ""
echo "Setting go path..."
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
fi

echo ""
echo ""
echo "Installing dependencies..."
sudo apt-get install jq git mercurial libgmp3-dev curl vim

echo ""
echo ""
echo "Installing decerver..."
go get github.com/eris-ltd/decerver/cmd/decerver
go install github.com/eris-ltd/decerver/cmd/decerver

echo ""
echo ""
echo "Installing Eris package manager..."
go get github.com/eris-ltd/epm-go/cmd/epm

echo ""
echo ""
echo "Installing ipfs..."
go get github.com/ipfs/go-ipfs/cmd/ipfs

echo ""
echo ""
echo "Downloading SmartVote..."
cd ~/
mkdir .decerver
cd .decerver
mkdir dapps
cd dapps
git clone http://github.com/e-movement/smartvote SmartVote

echo ""
echo ""
echo "Start up SmartVote..."
cd ~/.decerver/dapps/SmartVote
chmod -x ./start.sh
chmod -x ./startipfs.sh
chmod -x ./startbrowser.sh
./start.sh
